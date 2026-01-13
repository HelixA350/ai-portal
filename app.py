from flask import Flask, render_template, url_for


app = Flask(__name__)

@app.get('/')
def index():
    return render_template('index.html',
        title="ИИ-агенты | Корпоративный портал",
        hero_title="ИИ‑Агенты для вашего бизнеса",
        hero_subtitle="Автоматизируйте рутину, ускорьте документооборот и превратите встречи в решения — без ручного труда и потерь времени.",
        hero_image_url=url_for('static', filename='images/hero.webp'),
        hero_cta_url="/dashboard",
        hero_cta_text="Начать работу",
        agents=[
            {
                "name": "Анализ тендеров",
                "tags": ["тендеры", "анализ"],
                "image_url": url_for('static', filename='images/image.png'),
                "description": "Оценивает целесообразность участия в тендере и делает первичный анализ.",
                "action_url": "/agents/tender-analyzer/run",
                "detail_url": url_for('basic_tender')
            },
            {
                "name": "Анализ ТЗ",
                "tags": ["тендеры", "ТЗ", "Анализ"],
                "image_url": url_for('static', filename='images/image1.png'),
                "description": "Извлекает ключевую информацию из ТЗ на тендер.",
                "action_url": "/agents/tender-analyzer/run",
                "detail_url": url_for('data_extraction')
            },
        ]
    )

@app.get('/basic_tender')
def basic_tender():
    agent = {
        "name": "Анализ тендеров",
        "image_url": url_for('static', filename='images/image.png'),
        "description": "Автоматически анализирует тендеры, оценивает целесообразность участия.",
        "tags": ["тендеры", "анализ"],
        "action_url": "/agents/tender-analyzer/run",
        "features": [
            "Оценка по целесообразности участия",
            "Проверка надёжности заказчика",
            "Интеграция с битрикс (в разработке)"
        ],
        "use_cases": [
            "Быстрое отсеивание неподходящих тендеров",
            "Быстрая оценка рисков участия",
            "Подготовка обоснования для руководства",
            "Первичный анализ тендера",
        ],
        "long_description": "<p>Агент использует LLM и правила на основе опыта участия в тендерах. </p><p>Оценка тендера проводится на по критериям: соответствие профилю компании, регион исполнения, цена и юридическая информация о заказчике из ЕГРЮЛ</p>"
    }

    agents = [
        {"name": "Анализатор тендеров", "detail_url": "/agent/tender-analyzer"},
    ]

    return render_template(
        'agent-details.html',  # имя файла шаблона
        agent=agent,
        agents=agents
    )

@app.get('/data_extraction')
def data_extraction():
    agent = {
        "name": "Анализ ТЗ",
        "image_url": url_for('static', filename='images/image1.png'),
        "description": "Извлекает ключевую информацию из технического задания",
        "tags": ["тендеры", "анализ", "ТЗ"],
        "action_url": "/agents/tender-analyzer/run",
        "features": [
            "Классификация тендеров",
            "Выделение сроков из ТЗ",
            "Выделение требований к подрядчику"
        ],
        "use_cases": [
            "Быстрое отсеивание неподходящих тендеров",
            "Быстрая оценка рисков участия",
            "Подготовка обоснования для руководства",
            "Первичный анализ тендера",
        ],
        "long_description": "<p>Агент использует LLM и умный поиск по большому документу</p><p>Пока работает только с pdf. Извлекает из документации: тип тендера, сроки, ключевые этапы работа, требования по наличию лицензий и разрешений у подрядчика</p>"
    }

    agents = [
        {"name": "Анализатор тендеров", "detail_url": "/agent/tender-analyzer"},
    ]

    return render_template(
        'agent-details.html',  # имя файла шаблона
        agent=agent,
        agents=agents
    )

if __name__ == '__main__':
    app.run(debug=True)