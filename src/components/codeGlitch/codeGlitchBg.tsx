import CodeGlitch from './codeGlitch'

export default function codeGlitchBg() {
    return (
        <CodeGlitch
            glitchColors={["gray", "white", "black"]}
            glitchSpeed={60}
            centerVignette={true}
            outerVignette={false}
            smooth={false}
        />
    )
}