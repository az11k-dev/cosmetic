const CategoryItem = ({data}: any) => {
    return (
        <div style={{
            cursor: 'pointer',
        }} className="gi-cat-icon">
            <img
                src={data?.upload?.file_url ? data?.upload?.file_url : "https://cdn-icons-png.freepik.com/512/8058/8058572.png"}
                alt="img"/>
            <div className="gi-cat-detail">
                <h4 className="gi-cat-title">{data.name}</h4>
                <p className="items">{data.products_count} products</p>
            </div>
        </div>
    )
        ;
};

export default CategoryItem;
