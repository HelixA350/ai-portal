from flask import Flask, render_template, url_for
from agent_data import get_agents_data, enrich_agents_with_urls

app = Flask(__name__)

# Загружаем данные один раз при старте
agents_raw = get_agents_data()

@app.get('/')
def index():
    # Обогащаем данные ссылками внутри контекста запроса
    agents = enrich_agents_with_urls([a.copy() for a in agents_raw], app.app_context())
    
    # Для главной страницы нужны только поля из hero и краткая инфа об агентах
    return render_template('index.html',
        title="ИИ-агенты | Корпоративный портал",
        hero_title="ИИ‑Агенты для вашего бизнеса",
        hero_subtitle="Автоматизируйте рутину, ускорьте документооборот и превратите встречи в решения — без ручного труда и потерь времени.",
        hero_image_url=url_for('static', filename='images/hero.webp'),
        hero_cta_url="/dashboard",
        hero_cta_text="Начать работу",
        agents=agents
    )

@app.get('/basic_tender')
def basic_tender():
    agent = next((a for a in agents_raw if a["id"] == "basic_tender"), None)
    if not agent:
        return "Агент не найден", 404

    # Копируем и обогащаем
    enriched_agent = enrich_agents_with_urls([agent.copy()], app.app_context())[0]
    
    return render_template('agent-details.html',
        agent=enriched_agent,
        agents=[{"name": "Анализатор тендеров", "detail_url": "/agent/tender-analyzer"}]
    )

@app.get('/data_extraction')
def data_extraction():
    agent = next((a for a in agents_raw if a["id"] == "data_extraction"), None)
    if not agent:
        return "Агент не найден", 404

    enriched_agent = enrich_agents_with_urls([agent.copy()], app.app_context())[0]
    
    return render_template('agent-details.html',
        agent=enriched_agent,
        agents=[{"name": "Анализатор тендеров", "detail_url": "/agent/tender-analyzer"}]
    )

if __name__ == '__main__':
    app.run(debug=True)