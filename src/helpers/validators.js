/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
  filter,
  allPass,
  propEq,
  equals,
  length,
  count,
  pipe,
  compose,
  anyPass,
  gte,
} from "ramda";

const getTriangle = ({ triangle }) => triangle;
const getCircle = ({ circle }) => circle;
const getSquare = ({ square }) => square;
const getStar = ({ star }) => star;
const isWhite = (figure) => figure === "white";
const isGreen = (figure) => figure === "green";
const isRed = (figure) => figure === "red";
const isBlue = (figure) => figure === "blue";
const isOrange = (figure) => figure === "orange";
const atLeast2 = (length) => length >= 2;
const atLeast3 = (length) => length >= 3;
const squareAndTriangleHaveSameColor = (figures) => figures[1] === figures[2];
const getArray = ({ triangle, circle, square, star }) => [
  circle,
  square,
  triangle,
  star,
];

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  pipe(getTriangle, isWhite),
  pipe(getCircle, isWhite),
  pipe(getSquare, isGreen),
  pipe(getStar, isRed),
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(
  getArray,
  filter(isGreen),
  length,
  atLeast2
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = allPass([
  pipe(getArray, filter(isRed), length, equals(2)),
  pipe(getArray, filter(isBlue), length, equals(2)),
]);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  pipe(getCircle, isBlue),
  pipe(getStar, isRed),
  pipe(getSquare, isOrange),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
  pipe(getArray, filter(isRed), length, atLeast3),
  pipe(getArray, filter(isBlue), length, atLeast3),
  pipe(getArray, filter(isGreen), length, atLeast3),
  pipe(getArray, filter(isOrange), length, atLeast3),
]);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  pipe(getArray, filter(isGreen), length, equals(2)),
  pipe(getTriangle, isGreen),
  pipe(getArray, filter(isRed), length, equals(1)),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = pipe(
  getArray,
  filter(isOrange),
  length,
  equals(4)
);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
  pipe(getStar, isWhite, equals(false)),
  pipe(getStar, isRed, equals(false)),
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = pipe(
  getArray,
  filter(isGreen),
  length,
  equals(4)
);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
  pipe(getArray, squareAndTriangleHaveSameColor),
  pipe(getTriangle, isWhite, equals(false)),
]);
