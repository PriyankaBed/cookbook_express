import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.png";
import "./App.css";

function App() {
    // const [assets, setAssets] = useState([]);
    const [entries, setEntries] = useState([]);

    // const [recipeimage, setRecipeimage] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/posts")
            .then((response) => {
                console.log(response.data);
                // setAssets(response.data);
                setEntries(response.data);
                // setRecipeimage(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className='App'>
            <div className='header'>
                <div className='logo'>
                    <img src={logo} alt='logo' key='logo' />
                    <h2>Cookbook</h2>
                    <div className='menu-items'>
                        <div className='menu_name'>Home</div>
                        <div className='menu_name'>About</div>
                        <div className='menu_name'>News Letter</div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <main>
                    {entries.map((entry, index) => {
                        console.log(index);
                        return (
                            <div key={entry.sys.id}>
                                <h1 className='recipe-title'>{entry.fields.recipeName}</h1>
                                <div className='imgmain'>
                                    <img src={entry.fields.featuredImage.sys.url} alt={entry.fields.recipeName} />
                                </div>
                                <table>
                                    <div className='tablesub'>
                                        {entry.fields.recipeIngredients.content.map((content) => {
                                            if (content.nodeType === "table") {
                                                return content.content.map((row) => {
                                                    return (
                                                        <tr>
                                                            {row.content.map((col) => {
                                                                return <td>{col.content[0].content[0].value}</td>;
                                                            })}
                                                        </tr>
                                                    );
                                                });
                                            }
                                        })}
                                    </div>
                                </table>
                                <div className='para'>
                                    <div className='para_sub'>
                                        {entry.fields.recipeSteps.content.map((content) => {
                                            if (content.nodeType === "paragraph") {
                                                return <p>{content.content[0].value}</p>;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </main>
            </div>
        </div>
    );
}
export default App;
