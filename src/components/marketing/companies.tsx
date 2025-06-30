import { cn } from "@/lib/cn";
import Container from "../global/container";
import Images from "../global/images";

const logos = [
    <Images.company1 key="c1" className="h-7 w-auto flex-shrink-0" />,
    <Images.company2 key="c2" className="h-7 w-auto flex-shrink-0" />,
    <Images.company3 key="c3" className="h-7 w-auto flex-shrink-0" />,
    <Images.company6 key="c6" className="h-7 w-auto flex-shrink-0" />,
    <Images.company7 key="c7" className="h-7 w-auto flex-shrink-0" />,
    <Images.company9 key="c9" className="h-7 w-auto flex-shrink-0" />,
    <Images.company10 key="c10" className="h-7 w-auto flex-shrink-0" />,
];

const Companies = ({ className }: { className?: string }) => {
    return (
        <div className={cn(
            "relative flex flex-col items-center justify-center w-full py-20 mt-16 companies overflow-hidden",
            className
        )}>
            <Container>
                <div className="flex flex-col items-center justify-center">
                    <h4 className="text-sm font-medium uppercase tracking-[0.15rem] text-muted-foreground">
                        Trusted by engineers at
                    </h4>
                </div>
            </Container>

            <div
                className="relative mt-12 w-full overflow-hidden"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
                }}
            >
                <div className="flex min-w-max shrink-0 animate-scroll items-center gap-x-16">
                    {logos.map((logo, i) => (
                        <div key={i} className="flex-shrink-0">
                            {logo}
                        </div>
                    ))}
                    {logos.map((logo, i) => (
                        <div key={i + logos.length} className="flex-shrink-0">
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Companies;
