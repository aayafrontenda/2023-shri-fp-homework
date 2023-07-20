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

function pipeline(...funcs) {
  return async function (val) {
    for (let func of funcs) {
      // console.log(func);
      val = await func(val);
    }
    return val;
  };
}

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

const fromDecimalToBinary = async ({
  value,
  writeLog,
  handleSuccess,
  handleError,
}) => {
  // console.log("number 10", value);
  try {
    const response = await api.get("https://api.tech/numbers/base", {
      from: 10,
      to: 2,
      number: value,
    });
    // console.log("number 2", response);
    return { value: response.result, writeLog, handleError, handleSuccess };
  } catch (err) {
    // console.log(err);
    return handleError("API Error");
  }
};

const getAnimal = async ({ value, writeLog, handleSuccess, handleError }) => {
  try {
    const response = await api.get(`https://animals.tech/${value}`, {});
    // console.log("getAnimal", response);
    handleSuccess(response.result);
    return { value: response.result, writeLog, handleSuccess, handleError };
  } catch (err) {
    // console.log(err);
    return handleError("API Error");
  }
};

const toInt = ({ value, writeLog, handleSuccess, handleError }) => {
  // console.log("toint value", value);
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

const processSequence = pipeline(
  getWriteLog,
  validateValue,
  toInt,
  getWriteLog,
  fromDecimalToBinary,
  getWriteLog,
  getLength,
  getWriteLog,
  pow2,
  getWriteLog,
  mod3,
  getWriteLog,
  getAnimal
);
/*
const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  
};
*/

export default processSequence;
