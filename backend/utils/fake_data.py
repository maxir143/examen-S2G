import pandas as pd
from config import Settings
from models.charge_station import ChargeStationPartialModel
from repository.charge_stations import create_charge_station, delete_charge_stations

settings = Settings()

def load():
    df = pd.read_csv(
        "./detailed_ev_charging_stations.csv", encoding="utf-8", index_col="Station ID"
    )
    df = df[df["Address"].str.contains("mexico", case=False, na=False)]

    # init_db(get_db(settings.DATABASE_NAME))

    delete_charge_stations()

    for index, row in df.iterrows():
        create_charge_station(
            ChargeStationPartialModel(
                user_email="0BjL7@example.com",
                name=index,
                lat=row["Latitude"],
                long=row["Longitude"],
                capacity=row["Usage Stats (avg users/day)"] * 1000,
                active=row["Availability"] == "24/7",
            )
        )
