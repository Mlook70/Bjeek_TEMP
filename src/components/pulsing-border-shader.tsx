import { PulsingBorder } from "@paper-design/shaders-react"

export default function PulsingBorderShader(props: React.ComponentProps<typeof PulsingBorder>) {
  return (
    <PulsingBorder
      colors={["#00FF00", "#7FFF7F", "#4CAF50", "#2E7D32"]}
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
        width: "535px",
        height: "511px",
        borderRadius: "0px",
        backgroundImage:
          "radial-gradient(circle in oklab, oklab(0% 0 -.0001 / 0%) 25.22%, oklab(50% -0.25 0.15) 43.89%, oklab(0% 0 -.0001 / 0%) 60.04%)",
        ...props.style,
      }}
    />
  )
}