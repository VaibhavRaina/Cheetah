import { cn } from "@/lib/cn";
import Container from "../global/container";
import Images from "../global/images";

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
                className="relative mt-12 flex w-full max-w-full overflow-hidden"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
                }}
            >
                <div className="flex w-max animate-scroll">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex min-w-full shrink-0 items-center justify-around gap-20">
                            <Images.company1 className="h-7 w-auto" />
                            <Images.company2 className="h-7 w-auto" />
                            <Images.company3 className="h-7 w-auto" />
                            <Images.company6 className="h-7 w-auto" />
                            <Images.company7 className="h-7 w-auto" />
                            <Images.company9 className="h-7 w-auto" />
                            <Images.company10 className="h-7 w-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Companies
