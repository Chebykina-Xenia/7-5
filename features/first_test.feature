Feature: The ticket reservation cinema test

    Scenario: Session time check
        Given user is on page
        Given user choose a date
        When user chose a time "14:00"
        Then user check the session "Начало сеанса: 14:00"

    Scenario: Bookable ticket cinema
        Given user is on page
        Given user choose a date
        Given user chose a seans
        Given user chose a place
        Then reserv
