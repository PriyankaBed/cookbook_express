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
            <div className='container'>
                <header>
                    <div className='wrapper'>
                        <div className='wrapper_inner'>
                            <span className='wrapper_span'></span>
                        </div>
                    </div>
                </header>
                <main>
                    <div className='container_wrapper'>
                        <div className='wrapper'>
                            {entries.map((entry, index) => {
                                console.log(index);
                                return (
                                    <div key={entry.sys.id}>
                                        <div className='logo'>
                                            <img src={logo} alt='logo' key='logo' />
                                            <h2>Cookbook</h2>
                                        </div>
                                        <h1 className='recipe-title'>{entry.fields.recipeName}</h1>
                                        <table>
                                            <div className=''>
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
                                        {entry.fields.recipeSteps.content.map((content) => {
                                            if (content.nodeType === "paragraph") {
                                                return <p>{content.content[0].value}</p>;
                                            }
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default App;
