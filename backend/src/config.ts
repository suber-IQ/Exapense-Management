import dotenv from 'dotenv';


dotenv.config({});

class Config{
    public DATABASE_URL: string | undefined;
    public NODE_ENV: string | undefined;
    public PORT: number | undefined;
    public CLIENT_URL: string | undefined;

    private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/expanseManagement'
    private readonly DEFAULT_NODE_ENV = 'development';
    private readonly DEFAULT_PORT = 8000;
    private readonly DEFAULT_CLIENT_URL = 'http://localhost:5173'

    constructor(){
        this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
        this.NODE_ENV = process.env.NODE_ENV || this.DEFAULT_NODE_ENV;
        this.PORT = Number(process.env.PORT) || Number(this.DEFAULT_PORT);
        this.CLIENT_URL = process.env.CLIENT_URL || this.DEFAULT_CLIENT_URL;
    }

    public validateConfig(): void {
        for(const [key,value] of Object.entries(this)){
            if(value === undefined){
                throw new Error(`configuration ${key} is undefined...`);
            }
        }
    }
    

}

export const config: Config = new Config();
