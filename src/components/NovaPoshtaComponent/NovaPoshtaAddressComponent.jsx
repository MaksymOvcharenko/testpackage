// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// // src/NovaPoshtaAddressComponent.js

// import { useState, useEffect } from "react";
// import BarLoader from "react-spinners/BarLoader";
// import { fetchCitiesList, fetchStreetsList } from "./nova-poshta-api";
// import styles from "./NovaPoshtaAddressComponent.module.css";

// const NovaPoshtaAddressComponent = ({ setFieldValue }) => {
//   const [form, setForm] = useState({
//     city: "",
//     cityRef: "",
//     street: "",
//     streetRef: "",
//     house: "",
//     apartment: "",
//     floor: "",
//   });
//   const [citiesList, setCitiesList] = useState([]);
//   const [streetsList, setStreetsList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [color, setColor] = useState("#D9291C");
//   const [inputsDisabled, setInputsDisabled] = useState(false);

//   useEffect(() => {
//     // Обновляем родительское состояние, когда cityRef или streetRef изменяются
//     // setFieldValue(form);
//   }, [form]);

//   // Обработка ввода города
//   const handleCityChange = async (event) => {
//     const value = event.target.value;
//     setForm((prevForm) => ({ ...prevForm, city: value }));

//     if (value === "") {
//       setCitiesList([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetchCitiesList(value);
//       setCitiesList(response.data[0]?.Addresses || []);
//     } catch (error) {
//       console.error("Ошибка при загрузке списка городов", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Обработка выбора города
//   const handleCityClick = async (cityName, cityRef) => {
//     setForm((prevForm) => ({ ...prevForm, city: cityName, cityRef }));
//     setCitiesList([]);
//     setInputsDisabled(false);
//   };

//   // Обработка ввода улицы
//   const handleStreetChange = async (event) => {
//     const value = event.target.value;
//     setForm((prevForm) => ({ ...prevForm, street: value }));

//     if (value === "" || !form.cityRef) {
//       setStreetsList([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetchStreetsList(value, form.cityRef);
//       const streets = response.data[0]?.Addresses || [];
//       setStreetsList(streets);
//     } catch (error) {
//       console.error("Ошибка при загрузке списка улиц", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Обработка выбора улицы
//   const handleStreetClick = (streetName, streetRef) => {
//     setForm((prevForm) => ({
//       ...prevForm,
//       street: streetName,
//       streetRef,
//     }));
//     setStreetsList([]);
//   };

//   // Обработка очистки ввода
//   const handleClearInput = () => {
//     setCitiesList([]);
//     setStreetsList([]);
//     setForm({
//       city: "",
//       cityRef: "",
//       street: "",
//       streetRef: "",
//       house: "",
//       apartment: "",
//       floor: "",
//     });
//     setInputsDisabled(false);
//   };

//   // Обработка отправки формы
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!form.city || !form.street) {
//       alert("Необходимо выбрать город и улицу");
//       return;
//     }
//     console.log("Выбран город:", form.city);
//     console.log("Выбран город Ref:", form.cityRef);
//     console.log("Выбрана улица:", form.street);
//     console.log("Выбран улица Ref:", form.streetRef);
//     console.log("Номер дома:", form.house);
//     console.log("Квартира:", form.apartment);
//     console.log("Этаж:", form.floor);
//   };

//   const isSubmitButtonEnabled = form.city && form.street;

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             name="city"
//             placeholder="Название города"
//             value={form.city}
//             onChange={handleCityChange}
//             disabled={inputsDisabled}
//             className={styles.input}
//           />
//         </div>
//         {form.cityRef && (
//           <div>
//             <input
//               type="text"
//               name="street"
//               placeholder="Название улицы"
//               value={form.street}
//               onChange={handleStreetChange}
//               disabled={inputsDisabled}
//               className={styles.input}
//             />
//           </div>
//         )}
//         {form.streetRef && (
//           <div>
//             <input
//               type="text"
//               name="house"
//               placeholder="Номер дома"
//               value={form.house}
//               onChange={(e) => setForm({ ...form, house: e.target.value })}
//               className={styles.input}
//             />
//             <input
//               type="text"
//               name="apartment"
//               placeholder="Квартира"
//               value={form.apartment}
//               onChange={(e) => setForm({ ...form, apartment: e.target.value })}
//               className={styles.input}
//             />
//             <input
//               type="text"
//               name="floor"
//               placeholder="Этаж"
//               value={form.floor}
//               onChange={(e) => setForm({ ...form, floor: e.target.value })}
//               className={styles.input}
//             />
//           </div>
//         )}
//         <button
//           type="button"
//           onClick={handleClearInput}
//           className={styles.button}
//         >
//           Очистити
//         </button>
//       </form>
//       <div className={styles.loader}>
//         <BarLoader color="#007bff" loading={isLoading} width={"100%"} />
//       </div>
//       {citiesList.length > 0 && (
//         <ul className={styles.list}>
//           {citiesList.map(({ Present, MainDescription, Ref }) => (
//             <li
//               key={Ref}
//               className={styles.listItem}
//               onClick={() => handleCityClick(MainDescription, Ref)}
//             >
//               {Present}
//             </li>
//           ))}
//         </ul>
//       )}
//       {streetsList.length > 0 && (
//         <ul className={styles.list}>
//           {streetsList.map(
//             ({ SettlementStreetDescription, SettlementStreetRef }) => (
//               <li
//                 key={SettlementStreetRef}
//                 className={styles.listItem}
//                 onClick={() =>
//                   handleStreetClick(
//                     SettlementStreetDescription,
//                     SettlementStreetRef
//                   )
//                 }
//               >
//                 {SettlementStreetDescription}
//               </li>
//             )
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NovaPoshtaAddressComponent;
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import BarLoader from "react-spinners/BarLoader";
// import { fetchCitiesList, fetchStreetsList } from "./nova-poshta-api";
// import styles from "./NovaPoshtaAddressComponent.module.css";
// import { selectDeliveryAddress } from "../../redux/form/formSelectors.js";
// import { useSelector } from "react-redux";
// import icons from "../../image/icons.svg";

// const NovaPoshtaAddressComponent = ({ setFieldValue }) => {
//   const deliveryAdress = useSelector(selectDeliveryAddress);

//   const [form, setForm] = useState({
//     city: deliveryAdress.city,
//     cityRef: deliveryAdress.cityRef,
//     street: deliveryAdress.street,
//     streetRef: deliveryAdress.streetRef,
//     house: deliveryAdress.house,
//     apartment: deliveryAdress.apartment,
//     floor: deliveryAdress.floor,
//   });
//   const [citiesList, setCitiesList] = useState([]);
//   const [streetsList, setStreetsList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputsDisabled, setInputsDisabled] = useState(false);

//   // Оновлення батьківського стану при зміні форми
//   useEffect(() => {
//     if (form.cityRef && form.streetRef && form.house) {
//       setFieldValue(form); // Передаємо дані у вищий компонент
//     }
//   }, [form]);

//   const handleCityChange = async (event) => {
//     const value = event.target.value;
//     setForm((prevForm) => ({ ...prevForm, city: value }));

//     if (value === "") {
//       setCitiesList([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetchCitiesList(value);
//       setCitiesList(response.data[0]?.Addresses || []);
//     } catch (error) {
//       console.error("Помилка під час завантаження списку міст", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCityClick = async (cityName, cityRef) => {
//     setForm((prevForm) => ({ ...prevForm, city: cityName, cityRef }));
//     setCitiesList([]);
//     setInputsDisabled(false);
//   };

//   const handleStreetChange = async (event) => {
//     const value = event.target.value;
//     setForm((prevForm) => ({ ...prevForm, street: value }));

//     if (value === "" || !form.cityRef) {
//       setStreetsList([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetchStreetsList(value, form.cityRef);
//       const streets = response.data[0]?.Addresses || [];
//       setStreetsList(streets);
//     } catch (error) {
//       console.error("Помилка під час завантаження списку вулиць", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStreetClick = (streetName, streetRef) => {
//     setForm((prevForm) => ({
//       ...prevForm,
//       street: streetName,
//       streetRef,
//     }));
//     setStreetsList([]);
//   };

//   const handleClearInput = () => {
//     setCitiesList([]);
//     setStreetsList([]);
//     setForm({
//       city: "",
//       cityRef: "",
//       street: "",
//       streetRef: "",
//       house: "",
//       apartment: "",
//       floor: "",
//     });
//     setInputsDisabled(false);
//   };

//   return (
//     <div className={styles.container}>
//       <form>
//         <div>
//           <input
//             type="text"
//             name="city"
//             placeholder="Назва міста"
//             value={form.city}
//             onChange={handleCityChange}
//             disabled={inputsDisabled}
//             className={styles.input}
//           />
//         </div>
//         {form.cityRef && (
//           <div>
//             <input
//               type="text"
//               name="street"
//               placeholder="Назва вулиці"
//               value={form.street}
//               onChange={handleStreetChange}
//               disabled={inputsDisabled}
//               className={styles.input}
//             />
//           </div>
//         )}
//         {form.streetRef && (
//           <div>
//             <input
//               type="text"
//               name="house"
//               placeholder="Номер будинку"
//               value={form.house}
//               onChange={(e) => setForm({ ...form, house: e.target.value })}
//               className={styles.input}
//             />
//             <input
//               type="text"
//               name="apartment"
//               placeholder="Квартира"
//               value={form.apartment}
//               onChange={(e) => setForm({ ...form, apartment: e.target.value })}
//               className={styles.input}
//             />
//             <input
//               type="text"
//               name="floor"
//               placeholder="Поверх"
//               value={form.floor}
//               onChange={(e) => setForm({ ...form, floor: e.target.value })}
//               className={styles.input}
//             />
//           </div>
//         )}
//         <button
//           type="button"
//           onClick={handleClearInput}
//           className={styles.buttonClear}
//         >
//           <svg className={styles.svgRemove} width="17" height="14">
//             <use
//               className={styles.iconRemove}
//               href={`${icons}#icon-remove`}
//             ></use>
//           </svg>
//           Очистити
//         </button>
//       </form>
//       <div className={styles.loader}>
//         <BarLoader color="#007bff" loading={isLoading} width={"100%"} />
//       </div>
//       {citiesList.length > 0 && (
//         <ul className={styles.list}>
//           {citiesList.map(({ Present, MainDescription, Ref }) => (
//             <li
//               key={Ref}
//               className={styles.listItem}
//               onClick={() => handleCityClick(MainDescription, Ref)}
//             >
//               {Present}
//             </li>
//           ))}
//         </ul>
//       )}
//       {streetsList.length > 0 && (
//         <ul className={styles.list}>
//           {streetsList.map(
//             ({ SettlementStreetDescription, SettlementStreetRef }) => (
//               <li
//                 key={SettlementStreetRef}
//                 className={styles.listItem}
//                 onClick={() =>
//                   handleStreetClick(
//                     SettlementStreetDescription,
//                     SettlementStreetRef
//                   )
//                 }
//               >
//                 {SettlementStreetDescription}
//               </li>
//             )
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NovaPoshtaAddressComponent;
import { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import { fetchCitiesList, fetchStreetsList } from "./nova-poshta-api";
import styles from "./NovaPoshtaAddressComponent.module.css";
import { selectDeliveryAddress } from "../../redux/form/formSelectors.js";
import { useSelector } from "react-redux";
import icons from "../../image/icons.svg";

const NovaPoshtaAddressComponent = ({ setFieldValue }) => {
  const deliveryAdress = useSelector(selectDeliveryAddress);

  const [form, setForm] = useState({
    city: deliveryAdress.city,
    cityRef: deliveryAdress.cityRef,
    street: deliveryAdress.street,
    streetRef: deliveryAdress.streetRef,
    house: deliveryAdress.house,
    apartment: deliveryAdress.apartment,
    floor: deliveryAdress.floor,
  });
  const [citiesList, setCitiesList] = useState([]);
  const [streetsList, setStreetsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);

  const [errors, setErrors] = useState({
    city: "",
    street: "",
  });

  // Регулярний вираз для перевірки на кирилицю
  const cyrillicRegex = /^[а-яА-ЯіїєґІЇЄҐ]+$/;

  // Оновлення батьківського стану при зміні форми
  useEffect(() => {
    if (form.cityRef && form.streetRef && form.house) {
      setFieldValue(form); // Передаємо дані у вищий компонент
    }
  }, [form]);

  const validateField = (name, value) => {
    if (name === "city" || name === "street") {
      if (!cyrillicRegex.test(value) && value !== "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Дозволені тільки кирилиця!",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
  };

  const handleCityChange = async (event) => {
    const value = event.target.value;
    setForm((prevForm) => ({ ...prevForm, city: value }));
    validateField("city", value);

    if (value === "") {
      setCitiesList([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchCitiesList(value);
      setCitiesList(response.data[0]?.Addresses || []);
    } catch (error) {
      console.error("Помилка під час завантаження списку міст", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCityClick = async (cityName, cityRef) => {
    setForm((prevForm) => ({ ...prevForm, city: cityName, cityRef }));
    setCitiesList([]);
    setInputsDisabled(false);
  };

  const handleStreetChange = async (event) => {
    const value = event.target.value;
    setForm((prevForm) => ({ ...prevForm, street: value }));
    validateField("street", value);

    if (value === "" || !form.cityRef) {
      setStreetsList([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchStreetsList(value, form.cityRef);
      const streets = response.data[0]?.Addresses || [];
      setStreetsList(streets);
    } catch (error) {
      console.error("Помилка під час завантаження списку вулиць", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStreetClick = (streetName, streetRef) => {
    setForm((prevForm) => ({
      ...prevForm,
      street: streetName,
      streetRef,
    }));
    setStreetsList([]);
  };

  const handleClearInput = () => {
    setCitiesList([]);
    setStreetsList([]);
    setForm({
      city: "",
      cityRef: "",
      street: "",
      streetRef: "",
      house: "",
      apartment: "",
      floor: "",
    });
    setInputsDisabled(false);
  };

  return (
    <div className={styles.container}>
      <form>
        <div>
          <input
            type="text"
            name="city"
            placeholder="Назва міста"
            value={form.city}
            onChange={handleCityChange}
            disabled={inputsDisabled}
            className={styles.input}
          />
          {errors.city && <p className={styles.error}>{errors.city}</p>}
        </div>
        {form.cityRef && (
          <div>
            <input
              type="text"
              name="street"
              placeholder="Назва вулиці"
              value={form.street}
              onChange={handleStreetChange}
              disabled={inputsDisabled}
              className={styles.input}
            />
            {errors.street && <p className={styles.error}>{errors.street}</p>}
          </div>
        )}
        {form.streetRef && (
          <div>
            <input
              type="text"
              name="house"
              placeholder="Номер будинку"
              value={form.house}
              onChange={(e) => setForm({ ...form, house: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              name="apartment"
              placeholder="Квартира"
              value={form.apartment}
              onChange={(e) => setForm({ ...form, apartment: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              name="floor"
              placeholder="Поверх"
              value={form.floor}
              onChange={(e) => setForm({ ...form, floor: e.target.value })}
              className={styles.input}
            />
          </div>
        )}
        <button
          type="button"
          onClick={handleClearInput}
          className={styles.buttonClear}
        >
          <svg className={styles.svgRemove} width="17" height="14">
            <use
              className={styles.iconRemove}
              href={`${icons}#icon-remove`}
            ></use>
          </svg>
          Очистити
        </button>
      </form>
      <div className={styles.loader}>
        <BarLoader color="#007bff" loading={isLoading} width={"100%"} />
      </div>
      {citiesList.length > 0 && (
        <ul className={styles.list}>
          {citiesList.map(({ Present, MainDescription, Ref }) => (
            <li
              key={Ref}
              className={styles.listItem}
              onClick={() => handleCityClick(MainDescription, Ref)}
            >
              {Present}
            </li>
          ))}
        </ul>
      )}
      {streetsList.length > 0 && (
        <ul className={styles.list}>
          {streetsList.map(
            ({ SettlementStreetDescription, SettlementStreetRef }) => (
              <li
                key={SettlementStreetRef}
                className={styles.listItem}
                onClick={() =>
                  handleStreetClick(
                    SettlementStreetDescription,
                    SettlementStreetRef
                  )
                }
              >
                {SettlementStreetDescription}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default NovaPoshtaAddressComponent;

