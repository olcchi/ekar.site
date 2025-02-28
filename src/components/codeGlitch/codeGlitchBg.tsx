import CodeGlitch from './codeGlitch'

export default function codeGlitchBg() {
    return (
        <CodeGlitch
            glitchColors={["gray", "white", "black"]}
            glitchSpeed={500}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
        />
    )
}