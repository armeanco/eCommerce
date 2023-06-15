import { AnimatedFade } from "../core/AnimatedFade";
import { ExampleFixedBackground } from "../parallax/fixedBg";

export default function ExampleOne() {
  return (
    <AnimatedFade>
      <div className="Example">
        <ExampleFixedBackground />
      </div>
    </AnimatedFade>
  );
}