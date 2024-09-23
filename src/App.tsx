import React, { useEffect, useState } from "react";
import axios from "axios";

const RANDOM_USER_EP = "https://randomuser.me/api";

interface RandomUser {
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  dob: {
    age: number;
  };
  email: string;
  cell: string;
  picture: {
    medium: string;
  };
  login: {
    uuid: string;
  };
}

const randomUsersApi = axios.create({
  baseURL: RANDOM_USER_EP,
  headers: {
    "Content-Type": "application/json",
  },
});

const gifbg = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXAwcTh6aXpoMGdiZnl5aGhkaTl3aHZ0eHYyaTR2aHExYXhvYTdxaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QpVUMRUJGokfqXyfa1/giphy.webp";

const App: React.FC = () => {
  const [count, setCount] = useState<number>(10);
  const [results, setResults] = useState<RandomUser[]>([]);

  useEffect(() => {
    getRandomUsers();
  }, []);

  const getRandomUsers = async () => {
    try {
      const res = await randomUsersApi.get<{ results: RandomUser[] }>("/", {
        params: { results: count },
      });
      const randomUsersResults = res.data?.results ?? [];
      setResults((prevResults) => [...prevResults, ...randomUsersResults]);
      setCount(10);
    } catch (error) {
      console.error("Error fetching random users:", error);
    }
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      backgroundImage: `url(${gifbg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "rgba(247, 249, 252, 0.9)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "1px solid #d1d5db",
        }}>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            style={{
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              width: "100px",
              border: "1px solid #d1d5db",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              marginRight: "10px",
            }}
          />
          <button
            onClick={getRandomUsers}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
              transition: "background-color 0.3s ease",
            }}
          >
            Get Users
          </button>
          <p style={{ margin: "0", fontSize: "16px", color: "#333" }}>
            Results: {results.length}
          </p>
        </div>
  
        <div className="random-users-container" style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {results.map((result, index) => {
            const { name, location, dob, email, cell, picture, login } = result;
  
            return (
              <div
                key={`random-user-card-${index}-${login.uuid}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px",
                  marginBottom: "12px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease",
                }}
              >
                <img
                  src={picture.medium}
                  alt={`${name.first} ${name.last}`}
                  style={{
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    marginRight: "35px",
                    marginLeft: "20px"
                  }}
                />
                <div style={{ flexGrow: 1}}>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "18px" }}>
                    {name.title} {name.first} {name.last}
                  </h4>
                  <p style={{ margin: "0", fontSize: "14px", color: "#6b7280" }}>
                    {location.street.number} {location.street.name}, {location.city}, {location.state}, {location.country}
                  </p>
                  <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#6b7280" }}>
                    Age: {dob.age} | Email: {email}
                  </p>
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "12px",
                    gap: 50,
                  }}>
                    <button
                      onClick={() => window.location.href = `mailto:${email}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      ✉️
                    </button>
                    <button
                      onClick={() => window.location.href = `tel:${cell}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      📞
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setResults(results.filter((_, i) => i !== index));
                  }}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "none",
                    transition: "background-color 0.3s ease",
                    marginRight: 20
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;