/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";
import { pipe } from "ramda";

const api = new Api();

const getWriteLog = ({ value, writeLog, handleSuccess, handleError }) => {
  writeLog(value);
  return { value, writeLog, handleSuccess, handleError };
};

const validateValue = ({ value, writeLog, handleSuccess, handleError }) => {
  if (
    value.toString().length < 10 &&
    value.toString().length > 2 &&
    parseInt(value) > 0
  ) {
    return { value, writeLog, handleSuccess, handleError };
  }
  return handleError("ValidationError");
};

const fromDecimalToBinary = ({
  value,
  writeLog,
  handleSuccess,
  handleError,
}) => {
  console.log("number 10", value);
  api
    .get("https://api.tech/numbers/base", {
      from: 10,
      to: 2,
      number: value,
    })
    .then((res) => res)
    .catch((err) => console.log(err));
  console.log("number 2", value);
  return { value: value, writeLog, handleError, handleSuccess };
  // Add .catch() to handle errors if needed
};

const getAnimal = ({ value, writeLog, handleSuccess, handleError }) => {
  api
    .get(`https://animals.tech/${value}`, {})
    .then((res) => res)
    .catch((err) => console.log(err));
  handleSuccess(value);
  return { value, writeLog, handleSuccess, handleError };
};

const toInt = ({ value, writeLog, handleSuccess, handleError }) => {
  console.log("toint value", value);
  return {
    value: parseInt(value),
    writeLog: writeLog,
    handleSuccess,
    handleError,
  };
};

const intToBinary = pipe(toInt, fromDecimalToBinary);

const getLength = ({ value, writeLog, handleSuccess, handleError }) => ({
  value: value.toString().length,
  writeLog,
  handleSuccess,
  handleError,
});

const mod3 = ({ value, writeLog, handleSuccess, handleError }) => ({
  value: value % 3,
  writeLog,
  handleSuccess,
  handleError,
});

const pow2 = ({ value, writeLog, handleSuccess, handleError }) => ({
  value: Math.pow(value, 2),
  writeLog,
  handleSuccess,
  handleError,
});

const processSequence = pipe(
  pipe(getWriteLog),
  pipe(validateValue),
  pipe(toInt, getWriteLog),
  pipe(intToBinary, getWriteLog),
  pipe(getLength, getWriteLog),
  pipe(pow2, getWriteLog),
  pipe(mod3, getWriteLog),
  pipe(getAnimal, getWriteLog)
);
/*
const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  
};
*/

export default processSequence;
