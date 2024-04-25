import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  console.log(products);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      if (data?.products) {
        setProducts(data.products);
      }
    }
    fetchData();
  }, []);

  const paginationHandler = (index) => {
    setPage(index);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '2px solid blue',
          width: '100%',
        }}
      >
        {products.length > 0 &&
          products.slice(page * 5 - 5, page * 5).map((item) => {
            return (
              <div style={style.container}>
                <span>{item.title}</span>
                <img
                  src={item.thumbnail}
                  width={150}
                  height={200}
                  alt={item.title}
                />
              </div>
            );
          })}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {[...Array(products.length / 5)].map((_, i) => (
          <span
            style={{
              cursor: 'pointer',
            }}
          >
            <ul style={{ display: 'flex', listStyle: 'none' }}>
              <li
                style={{ marginRight: '5px' }}
                onClick={() => paginationHandler(i + 1)}
              >
                <a
                  style={{
                    textDecoration: 'none',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    color: '#333',
                  }}
                >
                  {i + 1}
                </a>
              </li>
            </ul>
          </span>
        ))}
      </div>
    </>
  );
}

export default App;

const style = {
  container: {
    border: '2px solid green',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2%',
    boxSizing: 'border-box',
  },
};
