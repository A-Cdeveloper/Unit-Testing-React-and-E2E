import { useEffect, useState } from "react";
import axios from "axios";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("tags:", tags);
  ///
  useEffect(() => {
    setLoading(true);

    try {
      axios.get("http://localhost:3004/tags").then((response) => {
        console.log("response:", response.data);
        setTags(response.data);
      });
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      {tags.map((tag) => (
        <div key={tag.id} data-testid="tag">
          {tag.name}
        </div>
      ))}
    </>
  );
};

export default Tags;
