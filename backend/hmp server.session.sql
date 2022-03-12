SELECT slot_id,
    start_time,
    end_time
FROM slots
WHERE doctor_id = 1
    AND DATE(start_time) = DATE("2022-03-15");
