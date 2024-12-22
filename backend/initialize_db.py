from app.database import metadata, engine

print("Creating tables...")
metadata.create_all(bind=engine)
print("Tables created successfully!")
