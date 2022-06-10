/***
 * Create by Kuznetsov Leonid
 * Orlan1211@yahoo.com
 * 10.06.2022
 * 
 * Совсем не осталось времени на реструктуризацияю, поэтому получилась партянка (((
 * 
 * */

import React from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';

const Main = () => {
        const container = document.getElementById("array");
        /**
         * ГЕНЕРАТОР МАССИВА СЛУЧАЙНЫХ ЧИСЕЛ
         */
        function generatearray() {
            container.innerHTML = "";                                         // Очищение блока перед новым заполнением

            for (let i = 0; i < 20; i++) {
                let value = Math.ceil(Math.random() * 100);                   // Возвращает значение от 1 до 100 (оба включительно)

                let arrItem = document.createElement("div");                  // Создание элемента div

                arrItem.classList.add("block");                               // Добавление блока класса в div

                arrItem.style.height = `${value * 3}px`;                      // Добавляем стиль в div
                arrItem.style.transform = `translate(${i * 30}px)`;

                let arrItemLable = document.createElement("label");           // Создание элемента label для отображения 
                arrItemLable.classList.add("block_id");                       // размера конкретного блока
                arrItemLable.innerText = value;
                
                arrItem.appendChild(arrItemLable);                            // Добавление созданных элементов в main
                container.appendChild(arrItem);
            }
        }

        /**
         * ПЛАВНАЯ ЗАМЕНА МЕСТАМИ ITEM
         * @param {*} i 
         * @param {*} j 
         * @returns 
         */
        function swap(i, j) {
            return new Promise((resolve) => {

                //Для обмена стилями двух блоков
                let temp = i.style.transform;
                i.style.transform = j.style.transform;
                j.style.transform = temp;

                window.requestAnimationFrame(function() {

                    // Для ожидания 0,25 сек.
                    setTimeout(() => {
                        container.insertBefore(j, i);
                        resolve();
                    }, 250);
                });
            });
        }

        /**
         * АСИНХРОННАЯ ФУНКЦИЯ ПУЗЫРЬКОВОЙ СОРТИРОВКИ
         * @param {0,1 сек} delay 
         */
        async function BubbleSort(delay = 100) {
            let blocks = document.querySelectorAll(".block");

            // Алгаритм пузырьковой сортировки
            for (let i = 0; i < blocks.length; i += 1) {
                for (let j = 0; j < blocks.length - i - 1; j += 1) {

                    /**
                     * Изменение цвета блока при перестановке
                     * цвет опорного элемента
                     */
                    blocks[j].style.backgroundColor = "#FF4949";
                    blocks[j + 1].style.backgroundColor = "#FF4949";

                    // Задержка 0,1 сек
                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, delay)
                    );

                    let value1 = Number(blocks[j].childNodes[0].innerHTML);
                    let value2 = Number(blocks[j + 1]
                                .childNodes[0].innerHTML);

                    // Сравнивание значения двух блоков
                    if (value1 > value2) {
                        await swap(blocks[j], blocks[j + 1]);
                        blocks = document.querySelectorAll(".block");
                    }

                    /**
                     * Изменение цвета на предыдущий
                     * цвет исходного, неотсортированного элемента
                     */
                    blocks[j].style.backgroundColor = "#6b5b95";
                    blocks[j + 1].style.backgroundColor = "#6b5b95";
                }

                /**
                 * изменение цвета отсортированного элемента
                 */
                blocks[blocks.length - i - 1]
                .style.backgroundColor = "#13CE66";
            }
        }


        /**
         * АСИНХРОННАЯ ФУНКЦИЯ БИНАРНОГО ПОИСКА
         * @param {0.3 cек} delay 
         */
        async function BinarySearch(delay = 300) {
            let blocks = document.querySelectorAll(".block");
            let output = document.getElementById("text");

            let num = document.getElementById("fname").value;           //Извлечение значения элемента, подлежащего поиску

            for (let i = 0; i < blocks.length; i += 1) {                //Окрашивание всех блоков в фиолетовый цвет
                blocks[i].style.backgroundColor = "#6b5b95";
            }

            output.innerText = "";

            // Алгоритм бинарного поиска

            let start = 0;
            let end = 19;
            let flag = 0;
            while (start <= end) {
                
                let mid = Math.floor((start + end) / 2);                 //Средний индекс
                blocks[mid].style.backgroundColor = "#FF4949";

                let value = Number(blocks[mid].childNodes[0].innerHTML); //Значение по среднему индексу

                await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                    }, delay)
                );

                //Текущий элемент равен элементу
                //введенного пользователем
                if (value == num) {
                    output.innerText = "Элемент найден";
                    blocks[mid].style.backgroundColor = "#13CE66";
                    flag = 1;
                    break;
                }

                //Текущий элемент больше, чем элемент
                //введенный пользователем
                if (value > num) {
                end = mid - 1;
                blocks[mid].style.backgroundColor = "#6b5b95";
                } else {
                start = mid + 1;
                blocks[mid].style.backgroundColor = "#6b5b95";
                }
            }

            //Если число не найдено
            if (flag === 0) {
                output.innerText = "Элемент не найден или массив неотсортированный";
            }
    }
    

    return(
        <>
            <main className = "Main">
                <div className = "Container">
                    <div className = "Main__title">
                        <Card 
                            className="Main__btnList" 
                            style={{'border':'none'}}
                        >
                            <h1 className = "Main__title__txt">
                                Визуализация сортировки массива
                            </h1>
                            <h6>Нажми "перемешать" чтобы создать новый массив!</h6>
                        </Card>
                    </div>
                    <div className = "Main__list">
                        
                    </div>
                        <Card 
                            className = "Main__btnList" 
                            style     = {{'border':'none'}}
                        >
                            <Row>
                                <Col>
                                    <Button 
                                        onClick = {generatearray} 
                                        variant = "outline-dark"
                                    >
                                            Перемешать
                                    </Button>
                                </Col>
                                <Col>
                                    <Button 
                                        onClick = {BubbleSort} 
                                        variant = "outline-dark"
                                    >
                                        Сортировать
                                    </Button>
                                </Col>
                                <Col>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Искомое число</Form.Label>
                                            <Form.Control 
                                                type        = "text" 
                                                id          = "fname"
                                                name        = "fname" 
                                                placeholder = "Введите число" />
                                        </Form.Group>
                                    </Form>
                                
                                    <Button 
                                        onClick = {BinarySearch}
                                        variant = "outline-dark"
                                    >
                                        Поиск
                                    </Button>
                                </Col>
                            </Row>
                            <div id="text"></div>
                        </Card>
                </div>
            </main>
        </>
    )
}

export default Main

    