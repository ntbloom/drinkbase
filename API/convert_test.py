import unittest
from convert import mixNum

class TestConversionMethods(unittest.TestCase):
    #simple 1/4s
    def test_float_one(self):
        self.assertEqual(mixNum(1.0), "1")

    def test_int_two(self):
        self.assertEqual(mixNum(2), "2")

    def test_one_quarter(self):
        self.assertEqual(mixNum(0.25), "1/4")

    def test_one_half(self):
        self.assertEqual(mixNum(0.5), "1/2")

    def test_bigger_than_one(self):
        self.assertEqual(mixNum(1.75), "1 3/4")

    #1/3 and 2/3
    def test_one_thirds(self):
        self.assertEqual(mixNum(0.33), "1/3")

    def test_mixed_thirds(self):
        self.assertEqual(mixNum(1.33), "1 1/3")

    def test_two_thirds(self):
        self.assertEqual(mixNum(1.66), "1 2/3")

if __name__=='__main__':
    unittest.main()

