import requests
import json
import base64
import io
from matplotlib import pyplot as plt
from matplotlib import image as mpimg

# location serving the API
api_host = '127.0.0.1:5000'


result = requests.get(f'http://{api_host}/reports', params={'report': 'number-sales-sponsor'})
enc_img = json.loads(result.content)['graph']
data = base64.b64decode((enc_img))
fp = io.BytesIO(data)
with fp:
    img = mpimg.imread(fp, format='png')
plt.imshow(img)
plt.show()

