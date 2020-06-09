from app.routes import parse_selection_string


def test_parse_selection_string():
    attribute_name = "atr"

    #test greater than
    string = ">4,3<"
    assert parse_selection_string(string, attribute_name) == "atr < 3.14"

    # test less than
    string = "2>,<3"
    assert parse_selection_string(string, attribute_name) == "atr = 3.14"

    #test single value
    string = "3.14"
    assert parse_selection_string(string, attribute_name) == "atr = 3.14"

    # test basic string with no dash
    string = "1,2,3"
    assert parse_selection_string(string,attribute_name) == "atr = 1 OR atr = 2 OR atr = 3"

    # test basic string with white space and no dash
    string = "1\t,2 ,3.2342"
    assert parse_selection_string(string, attribute_name) == "atr = 1 OR atr = 2 OR atr = 3.2342"

    #test complex string
    string = "1,2-4,3-5"
    assert parse_selection_string(string, attribute_name) == "atr = 1 OR (atr >= 2 AND atr <= 4) OR (atr >= 3 AND atr <= 5)"

    #test invalid strings
    string = "1,2-4-6,3-5,"
    assert parse_selection_string(string, attribute_name) == "atr = 1 OR (atr >= 3 AND atr <= 5)"

    # test invalid strings
    string = ""
    assert parse_selection_string(string, attribute_name) == ""

    # test invalid strings
    string = "2-"
    assert parse_selection_string(string, attribute_name) == ""