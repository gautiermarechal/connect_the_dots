import { v4 as uuidv4 } from "uuid";

const addUnknownCategory = (category) => {
  fetch("http://localhost:4000/categories")
    .then((res) => res.json())
    .then((json) => {
      const allCategories = json.data;
      if (!allCategories.some((categoryObj) => categoryObj.name === category)) {
        fetch("http://localhost:4000/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: uuidv4(), name: category }),
        }).then(() => {
          window.location.reload();
        });
      } else {
        window.location.reload();
      }
    });
};

export default addUnknownCategory;
