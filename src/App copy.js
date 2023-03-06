import React, { useState} from 'react';
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
  const [plug_type1, setPlugType1] = useState('');
  const [plug_type2, setPlugType2] = useState('');
  const [station_address, setStationAdress] = useState('');
  const [station_id, setStationId] = useState('');
  const [station_name, setStationName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      latitude: latitude,
      longitude: longitude,
      plug_amount: plug_amount,
      plug_kind: plug_kind,
      plug_type1: plug_type1,
      plug_type2: plug_type2,
      station_address: station_address,
      station_id: station_id,
      station_name: station_name,
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
    setPlugType1('');
    setPlugType2('');
    setStationAdress('');
    setStationId('');
    setStationName('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        </label>
        <br />
        <label>
          Longitude:
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </label>
        <br />
        <label>
          Plug Amount:
          <input type="text" value={plug_amount} onChange={(e) => setPlugAmount(e.target.value)} />
        </label>
        <br />
        <label>
          Plug Kind:
          <input type="text" value={plug_kind} onChange={(e) => setPlugKind(e.target.value)} />
        </label>
        <br />
        <label>
          Plug Type 1:
          <input type="text" value={plug_type1} onChange={(e) => setPlugType1(e.target.value)} />
        </label>
        <br />
        <label>
          Plug Type 2:
          <input type="text" value={plug_type2} onChange={(e) => setPlugType2(e.target.value)} />
        </label>
        <br />
        <label>
          Station Adress:
          <input type="text" value={station_address} onChange={(e) => setStationAdress(e.target.value)} />
        </label>
        <br />
        <label>
          Station Id:
          <input type="text" value={station_id} onChange={(e) => setStationId(e.target.value)} />
        </label>
        <br />
        <label>
          Station Name:
          <input type="text" value={station_name} onChange={(e) => setStationName(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
