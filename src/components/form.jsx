import { useEffect, useRef, useState } from "react";
import "./form.css";

export const Recipe = () => {
  const [recipeData, setrecipeData] = useState({
    title: "",
    ingredients: "",
    timetocook: "",
    image: "",
    instructions: ""
  });

  // const [page, setPage] = useState(0);
  const [getrecipe, getrecipedata] = useState([]);
  const [img, setImgUrl] = useState();
  const fileRef = useRef();

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "image") {
      value = URL.createObjectURL(fileRef.current.files[0]);
    }
    setrecipeData({
      ...recipeData,
      [name]: value
    });
    // console.log(recipeData);
  };

  useEffect(() => {
    // console.log("used");
    getRecipe();
  }, []);

  const getRecipe = () => {
    fetch(`http://localhost:8000/profile`)
      .then((d) => d.json())
      .then((res) => {
        // console.log(res)
        getrecipedata(res);
        console.log(getrecipe);
        getrecipe.map((e) => setImgUrl(e.image));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(recipeData);
    // console.log()
    fetch("http://localhost:8000/profile", {
      method: "POST",
      body: JSON.stringify(recipeData),
      headers: {
        "content-type": "application/json"
      }
    }).then(() => {
        getRecipe();
    });
  };


  return (
    <div>
      <div className="layout">
        <div className="left">
          <form action="" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              name="title"
              type="text"
              placeholder="Title"
            />
            <br />
            <br />
            <input
              onChange={handleChange}
              name="ingredients"
              type="text"
              placeholder="Ingredients"
            />
            <br />
            <br />
            <input
              onChange={handleChange}
              name="timetocook"
              type="text"
              placeholder="Time to cook"
            />
            <br />
            <br />
            <input
              type="file"
              onChange={handleChange}
              name="image"
              ref={fileRef}
            />
            <br />
            <br />
            <input
              onChange={handleChange}
              name="instructions"
              type="text"
              placeholder="Instructions"
            />
            <br />
            <br />
            <input type="submit" value="submit" />
          </form>
        </div>
        <div className="right">
            {getrecipe.map((e) => {
                <>
                    <h1>{e.title}</h1>
                    <span style={{
                        backgroundImage: `url(${e.image})`,
                        height: "200px",
                        width: "200px"
                    }}
                    ></span>
                    <h3>{e.timetocook}</h3>
                </>
            })}
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
}
