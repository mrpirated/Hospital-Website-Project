ALTER TABLE slots
ADD FOREIGN KEY (appointment_id) REFERENCES appointment (appointment_id)
