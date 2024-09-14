import React, { useState } from 'react'
import axios from 'axios'
import City from "./City";
import "../styles/Main.css";


function Main() {
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
    const [fiveDay, setFiveDay] = useState(false)

    const handleFiveDay = () => {
        setFiveDay(!fiveDay);
    };

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&lang=ru&appid=e932fa0c5df90f2f5a2c768987ac3d19 `

    const searchLocation = (event) => {
        if (location.length > 0) {
            console.log(url + "Заправшиваем данные от сюда")
            axios.get(url).then((response) => {
                setData(response.data.list)
                console.log(response.data.list)
            })
        }


    }

    return (
        <>
            <div className="search">
                <City setLocation={setLocation}/>
                <input
                    className="search inp"
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    placeholder='Укажите город'
                    type="text"/>
                <button
                    className="search buth"
                    onClick={searchLocation}
                >⌕</button>
                <button
                    className="search switch"
                    onClick={handleFiveDay}
                >{ fiveDay ? "показать тукущее" : "показать на 5 дней"}</button>
            </div>
            <div className="weather">
                {!fiveDay && (data.length > 0 && (
                    <div className="weather gr">
                        <div className="weather gr dt">{data[0].dt_txt.slice(0, 11)}</div>
                        <div className="weather gr temp">{data[0].main.temp}°С</div>
                        <img className="weather gr icon"
                             src={`https://openweathermap.org/img/wn/${data[0].weather[0].icon}.png`} alt="" width="50"/>
                    </div>

                ))}
                {fiveDay && (data.length > 0 && data.map((dataT) => ((dataT.dt_txt.slice(11) == "12:00:00") && (
                    <div className="weather gr" key={dataT.dt}>
                        <div className="weather gr dt">{dataT.dt_txt.slice(0, 11)}</div>
                        <div className="weather gr temp">{dataT.main.temp}°С</div>
                        <img className="weather gr icon"
                             src={`https://openweathermap.org/img/wn/${dataT.weather[0].icon}.png`} alt="" width="50"/>
                    </div>

                ))))}
            </div>
        </>
    );
}

export default Main;