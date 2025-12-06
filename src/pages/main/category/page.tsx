import CategoryFilter from "@/components/category/CategoryFilter.tsx";

const page = () => {
    const lang = localStorage.getItem("i18nextLng");
    return (
        <>
            <section className="gi-shop">
                <div className="container">
                    <CategoryFilter/>
                </div>
            </section>

        </>
    )
}

export default page;
