import Wrapper from "@/components/global/wrapper";
import ProductHero from "@/components/marketing/product/product-hero";
import ProductChat from "@/components/marketing/product/product-chat";
import ProductNextEdit from "@/components/marketing/product/product-next-edit";
import ProductCompletions from "@/components/marketing/product/product-completions";
import ProductSlack from "@/components/marketing/product/product-slack";
import ProductCTA from "@/components/marketing/product/product-cta";

const ProductPage = () => {
    return (
        <Wrapper className="py-20 relative">
            <ProductHero />
            <ProductChat />
            <ProductNextEdit />
            <ProductCompletions />
            <ProductSlack />
            <ProductCTA />
        </Wrapper>
    )
};

export default ProductPage;