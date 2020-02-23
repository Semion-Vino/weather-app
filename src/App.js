import React, {
  Component
} from 'react';
import Weather from './components/mainComp.js';


const key = '5739085cb0a54900837c9c863dc8bae8'; //Api key
class App extends Component {
  state = {
    temperature: '',
    icon: '',
    description: ''
  }

  /**
   * Generate a string of tomorrow's full date
   * @return {String}  Tomorrow's Date
   */
  getFullDate() {
    const tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    let monthZero = '';
    let dayZero = '';
    //Add a zero before the month & day if necessary
    if ((tomorrow.getMonth() + 1) < 10) {
      monthZero = 0;
    };
    if (tomorrow.getDate() < 10) {
      dayZero = 0;
    }

    return `${tomorrow.getFullYear()}-${monthZero}${tomorrow.getMonth() + 1}-${dayZero}${tomorrow.getDate()} 09:00:00`

  }

  /**
 * Set the state properties with the correct data
 * @param  {Number} weatherId ID of the weather, converted to the nearest hundread
 */
  setWetaherDetails(weatherId) {
    if (weatherId === 200) {
      this.setState({
        icon: '11d',
        description: 'Thunderstorm With Light Rain'
      })
    } else if (weatherId === 300) {
      this.setState({
        icon: '11d',
        description: 'Light Intensity Drizzle '
      })
    } else if (weatherId === 500) {
      this.setState({
        icon: '10d',
        description: 'Light Rain'
      })
    } else if (weatherId === 600) {
      this.setState({
        icon: '13d',
        description: 'Light Snow'
      })
    } else if (weatherId === 700) {
      this.setState({
        icon: '50d',
        description: 'Mist'
      })
    } else if (weatherId === 800) {
      this.setState({
        icon: '01d',
        description: 'Clear Sky'
      })
    }
  }

  componentDidMount() {
    //Fetch data from api
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=${key}`)
      .then(response => {
        return response.json();
      }).then(resp => {

        //Get tomorrow's full date & time
        const fullDate = this.getFullDate();

        //Get the neccessary array with the info for tomorrow at 09:00
        let tomorrowData;
        resp.list.forEach(el => {
          if (el.dt_txt === fullDate) {
            return tomorrowData = el;
          }
        });

        //Get and convert the weather ID to the nearest hundread
        const weatherId = Math.floor(tomorrowData.weather[0].id / 100) * 100;

        //Set the state properties with the correct data
        this.setWetaherDetails(weatherId);
        this.setState({
          temperature: tomorrowData.main.temp
        })

      }).catch(console.log)
  }

  render() {
    return (
      <Weather temperature={this.state.temperature}
        description={this.state.description}
        icon={this.state.icon}
      />

    );
  }
}

export default App;