import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyDQVdxdIsABShrpHEy7tncNwO2P4uKNqkI",
  authDomain: "ev-test-5fa23.firebaseapp.com",
  databaseURL: "https://ev-test-5fa23-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ev-test-5fa23",
  storageBucket: "ev-test-5fa23.appspot.com",
  messagingSenderId: "894259655254",
  appId: "1:894259655254:web:bb089d85194747f4ea81f7",
};

// Firebase uygulaması başlatma
firebase.initializeApp(firebaseConfig);

// Firebase Realtime Database bağlantısı
const db = firebase.database();

function App() {

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [plug_amount, setPlugAmount] = useState('');
  const [plug_kind, setPlugKind] = useState('');
  const [plug_types, setPlugTypes] = useState([]);
  const [station_address, setStationAdress] = useState('');
  const [station_id, setStationId] = useState('');
  const [station_name, setStationName] = useState('');
  const [station_brands, setStationBrands] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const plugTypesObject = plug_types.reduce((obj, value, index) => {
      obj[`plug_type_${index + 1}`] = value;
      return obj;
    }, {});
    
    
    const data = {
      latitude: parseFloat(latitude), 
      longitude: parseFloat(longitude),
      plug_amount: parseInt(plug_amount),
      plug_kind: parseInt(plug_kind),
      plug_types: plugTypesObject,
      station_address: station_address,
      station_id: parseInt(station_id),
      station_name: station_name,
      station_brands: station_brands,
    };

    const locationsRef = db.ref('locations');
    locationsRef.limitToLast(1).once('child_added', (snapshot) => {
      // Son verinin değerini al
      const lastData = snapshot.val();
      // Yeni verinin benzersiz id'si
      const newId = lastData.id + 1;
      console.log(lastData)

      // Yeni verinin objesini oluştur
      const newData = Object.assign({}, data, { id: newId });

      // Son verinin üzerine yeni veriyi ekle
      locationsRef.child(lastData.id).set(newData);
    });
    setLatitude('');
    setLongitude('');
    setPlugAmount('');
    setPlugKind('');
    setPlugTypes([]);
    setStationAdress('');
    setStationId('');
    setStationName('');
    handlePlugTypeChange("");
    setStationBrands("");
  };
  const addPlugTypeInput = () => {
    setPlugTypes(prevState => [...prevState, ""]);
  };
  
  const handlePlugTypeChange = (index, value) => {
    setPlugTypes(prevState => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };
  

  return (
    <div>
    <h3>Firebase New Data Send</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
          <p>99.999999 Şeklinde giriniz</p>
        </label>
        <br />
        <label>
          Longitude:
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required/>
          <p>99.999999 Şeklinde giriniz</p>
        </label>
        <br />
        <label>
          Plug Amount:
          <input type="text" value={plug_amount} onChange={(e) => setPlugAmount(e.target.value)} required/>
        </label>
        <br />
        <label>
          Plug Kind:
          <input type="text" value={plug_kind} onChange={(e) => setPlugKind(e.target.value)} required/>
        </label>
        <br />
        <label>
          Plug Types:
          <select value={plug_types[0]} onChange={(e) => handlePlugTypeChange(0, e.target.value)} required>
            <option value="" selected>plug_type_1 seçiniz</option>
            <option value="Type 2">Type 2</option>
            <option value="CHAdeMO">CHAdeMO</option>
            <option value="CCS/SAE">CCS/SAE</option>
            <option value="Wall">Wall (Euro)</option>
            <option value="Three Phase">Three Phase</option>
          </select>
          {plug_types.slice(1).map((value, index) => (
            <select key={index + 1} value={value} onChange={(e) => handlePlugTypeChange(index + 1, e.target.value)}>
              <option value="" selected>{`plug_type_${index + 2}`} seçiniz</option>
              <option value="Type 2">Type 2</option>
              <option value="CHAdeMO">CHAdeMO</option>
              <option value="CCS/SAE">CCS/SAE</option>
              <option value="Wall">Wall (Euro)</option>
              <option value="Three Phase">Three Phase</option>
            </select>
          ))}
          <button type="button" onClick={addPlugTypeInput}>+ Add Plug Type +</button>
        </label>
        <br />
        <label>
          Station Adress:
          <input type="text" value={station_address} onChange={(e) => setStationAdress(e.target.value)} required/>
        </label>
        <br />
        <label>
          Station Id:
          <input type="text" value={station_id} onChange={(e) => setStationId(e.target.value)} required/>
        </label>
        <br />
        <label>
          Station Name:
          <input type="text" value={station_name} onChange={(e) => setStationName(e.target.value)} required />
        </label>
        <br />
        <label>
          Station Brand:
          <input type="text" value={station_brands} onChange={(e) => setStationBrands(e.target.value)} required />
        </label>
        <p>İstasyon görselinin görünebilmesi için istasyon ismi ile görsel dosya adı aynı olmalıdır.</p>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}

export default App;
