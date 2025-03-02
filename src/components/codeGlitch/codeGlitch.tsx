import { useRef, useEffect } from "react";

const LetterGlitch = ({
    glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = true,
    smooth = true,
}: {
    glitchColors: string[];
    glitchSpeed: number;
    centerVignette: boolean;
    outerVignette: boolean;
    smooth: boolean;
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const letters = useRef<
        {
            char: string;
            color: string;
            targetColor: string;
            colorProgress: number;
            active: boolean;
            lastGlitchTime: number;
        }[]
    >([]);
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const lastGlitchTime = useRef(Date.now());
    const animationStartTime = useRef(Date.now());
    const isEntranceActive = useRef(true);
    // entranceDuration
    const entranceDuration = 5000;

    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const lettersAndSymbols = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "!", "@", "#", "$", "&", "*", "(", ")", "-", "_", "+", "=", "/",
        "[", "]", "{", "}", ";", ":", "<", ">", ",", "0", "1", "2", "3",
        "4", "5", "6", "7", "8", "9"
    ];

    const getRandomChar = () => {
        return lettersAndSymbols[
            Math.floor(Math.random() * lettersAndSymbols.length)
        ];
    };

    const getRandomColor = () => {
        return glitchColors[Math.floor(Math.random() * glitchColors.length)];
    };

    const hexToRgb = (hex: string) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const interpolateColor = (
        start: { r: number; g: number; b: number },
        end: { r: number; g: number; b: number },
        factor: number
    ) => {
        const result = {
            r: Math.round(start.r + (end.r - start.r) * factor),
            g: Math.round(start.g + (end.g - start.g) * factor),
            b: Math.round(start.b + (end.b - start.b) * factor),
        };
        return `rgb(${result.r},${result.g},${result.b})`;
    };

    const calculateGrid = (width: number, height: number) => {
        const columns = Math.ceil(width / charWidth);
        const rows = Math.ceil(height / charHeight);
        return { columns, rows };
    };

    const initializeLetters = (columns: number, rows: number) => {
        grid.current = { columns, rows };
        const totalLetters = columns * rows;
        letters.current = Array.from({ length: totalLetters }, () => ({
            char: getRandomChar(),
            color: getRandomColor(),
            targetColor: getRandomColor(),
            colorProgress: 1,
            active: false,
            lastGlitchTime: Date.now()
        }));
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        if (context.current) {
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const { columns, rows } = calculateGrid(rect.width, rect.height);
        initializeLetters(columns, rows);
    };

    const drawLetters = () => {
        if (!context.current || letters.current.length === 0) return;
        const ctx = context.current;
        const { width, height } = canvasRef.current!.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = "top";

        letters.current.forEach((letter, index) => {
            if (!letter.active) return;
            const x = (index % grid.current.columns) * charWidth;
            const y = Math.floor(index / grid.current.columns) * charHeight;
            ctx.fillStyle = letter.color;
            ctx.fillText(letter.char, x, y);
        });
    };

    const handleEntranceAnimation = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const { width, height } = canvas.getBoundingClientRect();
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

        const elapsed = Date.now() - animationStartTime.current;
        const progress = Math.min(elapsed / entranceDuration, 1);

        // Adjust the probability curve to start with a lower probability
        const adjustedProgress = Math.pow(progress, 1);

        let allActive = true;
        letters.current.forEach((letter, index) => {
            const x = (index % grid.current.columns) * charWidth + charWidth / 2;
            const y = Math.floor(index / grid.current.columns) * charHeight + charHeight / 2;
            const distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
            const baseProbability = distance / maxRadius;
            // Adjust the probability curve to start with a lower probability
            const probability = baseProbability * adjustedProgress / 200


            if (!letter.active && Math.random() < probability) {
                letter.active = true;
                letter.char = getRandomChar();
                letter.targetColor = getRandomColor();
                letter.colorProgress = 0;
            }

            if (!letter.active) {
                allActive = false;
            }
        });

        if (allActive) {
            isEntranceActive.current = false;
        }
    };

    const updateLetters = () => {
        if (!letters.current || letters.current.length === 0) return;

        const activeLetters = letters.current.filter(l => l.active);
        if (activeLetters.length === 0) return;

        const updateCount = Math.max(1, Math.floor(activeLetters.length * 0.05));

        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * activeLetters.length);
            const letter = activeLetters[index];

            letter.char = getRandomChar();
            letter.targetColor = getRandomColor();

            if (!smooth) {
                letter.color = letter.targetColor;
                letter.colorProgress = 1;
            } else {
                letter.colorProgress = 0;
            }
        }
    };

    const handleSmoothTransitions = () => {
        let needsRedraw = false;
        letters.current.forEach((letter) => {
            if (letter.colorProgress < 1) {
                letter.colorProgress += 0.05;
                letter.colorProgress = Math.min(letter.colorProgress, 0.5);

                const startRgb = hexToRgb(letter.color);
                const endRgb = hexToRgb(letter.targetColor);
                if (startRgb && endRgb) {
                    letter.color = interpolateColor(
                        startRgb,
                        endRgb,
                        letter.colorProgress
                    );
                    needsRedraw = true;
                }
            }
        });

        if (needsRedraw) {
            drawLetters();
        }
    };

    const animate = () => {
        if (isEntranceActive.current) {
            handleEntranceAnimation();
        }

        const now = Date.now();
        const distance = now - lastGlitchTime.current
        if (distance >= glitchSpeed) {
            updateLetters();
            lastGlitchTime.current = now;
        }

        drawLetters();

        if (smooth) {
            handleSmoothTransitions();
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        context.current = canvas.getContext("2d");
        animationStartTime.current = Date.now();
        resizeCanvas();
        animate();

        // let resizeTimeout;
        // const handleResize = () => {
        //     clearTimeout(resizeTimeout);
        //     resizeTimeout = setTimeout(() => {
        //         cancelAnimationFrame(animationRef.current!);
        //         animationStartTime.current = Date.now();
        //         isEntranceActive.current = true;
        //         resizeCanvas();
        //         animate();
        //     }, 500);
        // };

        // window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(animationRef.current!);
            // window.removeEventListener("resize", handleResize);
        };
    }, [glitchSpeed, smooth]);

    return (
        <div className="relative overflow-hidden h-full w-full">
            <canvas ref={canvasRef} className="block w-full h-full" />
            {outerVignette && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]" />
            )}
            {centerVignette && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-repeating-radial from-gray-50 dark:from-black to-transparent" />
            )}
        </div>
    );
};

export default LetterGlitch;