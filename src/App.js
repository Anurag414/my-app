import { useState, useEffect } from 'react';

 export default function CarSelector() {
  const [carTypes, setCarTypes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);

  useEffect(() => {
    fetch("https://server.sakshambhatt1.repl.co/car-type-options")
      .then(response => response.json())
      .then(data => {
        setCarTypes(data);
        setSelectedCarType(data.find(carType => carType.isDefault));
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedCarType) {
      fetch(`https://server--sakshambhatt1.repl.co//car-options/suv${selectedCarType.id}`)
        .then(response => response.json())
        .then(data => {
          setCarModels(data);
          setSelectedCarModel(data.find(carModel => carModel.isDefault));
        })
        .catch(error => console.error(error));
    }
  }, [selectedCarType]);

  function handleCarTypeChange(event) {
    const carType = carTypes.find(carType => carType.id === event.target.value);
    setSelectedCarType(carType);
  }

  function handleCarModelChange(event) {
    const carModel = carModels.find(carModel => carModel.id === event.target.value);
    setSelectedCarModel(carModel);
  }

  return (
    <div>
      <label htmlFor="car-type"> Select Car Type:</label>
      <select id="car-type" value={selectedCarType?.id} onChange={handleCarTypeChange}>
        {carTypes.map(carType => (
          <option key={carType.id} value={carType.id}>
            {carType.name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="car-model">Select Car Model:</label>
      <select id="car-model" value={selectedCarModel?.id} onChange={handleCarModelChange}>
        {carModels.map(carModel => (
          <option key={carModel.id} value={carModel.id}>
            {carModel.name}
          </option>
        ))}
      </select>
    </div>
  );
}
