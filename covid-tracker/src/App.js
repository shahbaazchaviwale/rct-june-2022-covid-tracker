import "./App.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { prettyPrintStat, sortData } from "./helper";
import TableData from "./Table";
import LineGraph from "./LineGraph";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryListTable, setCountryListTable] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [casesType, setCasesType] = useState("cases");
  let i = 0;
  const [mapCenter, setMapCenter] = useState([15.8497, 74.4977]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapZoom, setMapZoom] = useState(3);

  // For select item
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => {
        return response.clone().json();
      })
      .then((data) => {
        setCountryInfo(data);
        console.log('data >>', data);
      });
  }, []);

  // get all country names
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => {
          return response.clone().json();
        })
        .then((data) => {
          // get only 25 entries
          let LimitedData = data
            .filter((entry) => entry.cases > 1000)
            .slice(0, 100);

          const countries = LimitedData.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortDataByCases = sortData(LimitedData);
          setCountryListTable(sortDataByCases);

          setCountries(countries);
          setMapCountries(LimitedData);
        });
    };
    getCountriesData();
  }, []);

  const handleChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "Worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => {
        return response.clone().json();
      })
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        // set cordinates when data changes
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl sx={{ minWidth: 120 }}>
            <Select onChange={handleChange} value={country}>
              <MenuItem value="Worldwide">World Wide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={i++} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => {
              setCasesType("cases");
            }}
            title={"Coronavirus Cases"}
            cases={prettyPrintStat(countryInfo?.todayCases)}
            total={prettyPrintStat(countryInfo?.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => {
              setCasesType("recovered");
            }}
            title={"Recovered"}
            cases={prettyPrintStat(countryInfo?.todayRecovered)}
            total={prettyPrintStat(countryInfo?.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => {
              setCasesType("deaths");
            }}
            title={"Death"}
            cases={prettyPrintStat(countryInfo?.todayDeaths)}
            total={prettyPrintStat(countryInfo?.deaths)}
          />
          <InfoBox
            isRed
            title={"Tested"}
            cases={prettyPrintStat(countryInfo?.tests)}
            total={prettyPrintStat(countryInfo?.testsPerOneMillion)}
          />
          <InfoBox
            isRed
            title={"Cases Population"}
            cases={prettyPrintStat(countryInfo?.population)}
          />
        </div>

        <Map
          casesType={casesType}
          center={mapCenter}
          countries={mapCountries}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <TableData countries={countryListTable} />
          <h3 className="app__graph__title">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
