## Configurações
### Pré-requisitos
Você deve ter instalado em sua máquina o seguinte:
- [node.js](https://nodejs.org/en/download/prebuilt-installer/current)
- [git](https://git-scm.com/downloads)

### Passo-a-passo
Primeiro, clone este repositório localmente:

```bash
git clone https://github.com/dtonavitor/paggo-frontend.git
```

Depois, navegue até o diretório clonado.

No diretório, crie uma cópia do arquivo [.env.example](https://github.com/dtonavitor/paggo-frontend/blob/master/.env.example) com o nome '.env' e complete-o:
```bash
# adicione um valor aleatório ()
AUTH_SECRET= 
# adicione a url do servidor Nest
NEXT_PUBLIC_SERVER_URL=
```

Execute os seguintes comandos:

```bash
npm i # instala todas as dependências necessárias
npm run dev # inicia a aplicação
```

Pronto! Abra [http://localhost:3000](http://localhost:3000) no seu browser para ver o resultado.
