import { PulsingBorder } from "@paper-design/shaders-react"

export default function PulsingBorderShader(props: React.ComponentProps<typeof PulsingBorder>) {
  return (
    <div className="w-full max-w-[535px] aspect-[535/511] mx-auto">
      <PulsingBorder
        colors={["#86EFAC", "#BBF7D0", "#6EE7B7", "#A7F3D0"]}
        colorBack="#00000000"
        speed={1.5}
        roundness={1}
        thickness={0.05}
        softness={0.1}
        intensity={1}
        scale={0.65}
        rotation={0}
        {...props}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ...props.style,
        }}
      />
    </div>
  )
}