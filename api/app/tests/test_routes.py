import pytest

from app.routes import parse_selection_to_conditions


class TestParseSelectionToConditions:

    def test_single_value(self):
        assert parse_selection_to_conditions("-3", "atr") == "atr = -3"
        assert parse_selection_to_conditions("4 ", "atr") == "atr = 4"
        assert parse_selection_to_conditions("3.1415", "atr") == "atr = 3.1415"

    def test_less_than(self):
        assert parse_selection_to_conditions("<3", "atr") == "atr < 3"

    def test_greater_than(self):
        assert parse_selection_to_conditions(">3", "atr") == "atr > 3"

    def test_less_than_equals(self):
        assert parse_selection_to_conditions("<= 3", "atr") == "atr <= 3"

    def test_greater_than_equals(self):
        assert parse_selection_to_conditions(">= 3", "atr") == "atr >= 3"

    def test_multiple_values(self):
        assert parse_selection_to_conditions("1,2,3", "atr") == "atr = 1 OR atr = 2 OR atr = 3"
        assert parse_selection_to_conditions("1 ,2,3.14", "atr") == "atr = 1 OR atr = 2 OR atr = 3.14"

    def test_ranges(self):
        assert parse_selection_to_conditions("2 to4", "atr") == "(atr >= 2 AND atr <= 4)"
        assert parse_selection_to_conditions("1,2 to 4 ", "atr") == "atr = 1 OR (atr >= 2 AND atr <= 4)"
