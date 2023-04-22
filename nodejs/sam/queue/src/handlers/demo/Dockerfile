FROM public.ecr.aws/lambda/nodejs:14

COPY app.js package.json NotoSansJP-VariableFont_wght.ttf ./

RUN npm install

CMD ["app.handler"]
