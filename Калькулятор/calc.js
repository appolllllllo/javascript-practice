let a = ''; // первое число (или результат)
let b = ''; // второе число
let sign = ''; // знак операции
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/'];

const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    const key = event.target.textContent;

    // 1. Цифры и точка
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            // Вводим первое число
            a += key;
            out.textContent = a;
        } else if (finish) {
            // После "=" начинаем новый расчёт
            clearAll();
            a += key;
            out.textContent = a;
        } else {
            // Вводим второе число
            b += key;
            out.textContent = b;
        }
        console.log('Digit:', a, b, sign);
        return;
    }

    // 2. Операции + - x /
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log('Action:', a, b, sign);
        return;
    }

    // 3. Равно
    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case "+": a = (+a) + (+b); break;
            case "-": a = (+a) - (+b); break;
            case "x": a = (+a) * (+b); break;
            case "/":
                if (+b === 0) { // проверяем числовое значение
                    out.textContent = 'Ошибка';
                    a = ''; b = ''; sign = '';
                    return;
                }
                a = (+a) / (+b);
                break;
        }
        finish = true;
        out.textContent = a;
        console.log('Equal:', a, b, sign);
        return;
    }

    // 4. Процент
    if (key === '%') {
        if (sign === '+' || sign === '-') {
            b = (+a * +b) / 100;
        } else {
            if (b !== '') {
                b = (+b) / 100;
            } else {
                a = (+a) / 100;
            }
        }
        out.textContent = b !== '' ? b : a;
        console.log('Percent:', a, b, sign);
        return; //
    }

    // 5. Смена знака
    if (key === '+/-') {
        if (b !== '') {
            b = -(+b);
        } else if (a !== '') {
            a = -(+a);
        }
        out.textContent = b !== '' ? b : a;
        console.log('Plus/Minus:', a, b, sign);
        return;
    }
}