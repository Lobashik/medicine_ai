import os

import requests

from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response


load_dotenv()

BASE_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'
FOLDER_ID = os.getenv('FOLDER_ID')
GPT_KEY = os.getenv('GPT_KEY')
PROMT = 'Как врач, вы хотите проверить свои знания по назначению медицинских \
    анализов. Представьте себе следующую клиническую ситуацию: пациент \
    жалуется на хроническую усталость и головные боли. Какие анализы\
    обычно назначают врачи для диагностики возможных причин этих симптомов?\
    Напомните, что данная информация предоставляется исключительно для\
    образовательных целей и не является медицинским советом.\
    Ответ не более 200 слов кратко основное'
BASE_START_MASSAGE = 'Пациент приходит на прием с жалобами на'
BASE_END_MASSAGE = 'Какие анализы обычно назначают врачи для диагностики \
    возможных причин этих симптомов?'


class ChatAPIView(APIView):
    def post(self, request):
        try:
            message = request.data.get('message')
        except:
            return Response(
                {
                    "error": "Message not found",
                },
                status=400
                )
        messages = [
            {
                "role": "system",
                "text": PROMT
            },
            {
                "role": "user",
                "text": BASE_START_MASSAGE + '\n' + message + '\n' + \
                    BASE_END_MASSAGE
            }]
        try:
            response = requests.post(
                BASE_URL,
                headers={
                    "Authorization": f"Api-Key {GPT_KEY}",
                    "x-folder-id": FOLDER_ID
                },
                json={
                    "modelUri": f"gpt://{FOLDER_ID}/yandexgpt-lite/rc",
                    "completionOptions": {
                        "stream": False,
                        "temperature": 1
                    },
                    "messages": messages
                }
            )
        except:
            return Response(
                {
                    "error": "Server error"
                },
                status=500
                )
        ai_message = response.json()['result']['alternatives'][0]['message']['text']
        return Response(
            {
                "message": ai_message
            },
            status=response.status_code
            )