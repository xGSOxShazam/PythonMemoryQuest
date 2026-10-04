const extraChallenges = [
  [
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ncoins = 5\ncoins += 2\nprint(coins)",
      "expected": "7",
      "clue": "+= adds to the existing value."
    },
    {
      "type": "Build",
      "prompt": "Create a string variable named hero containing Mira.",
      "verify": "hero == \"Mira\"",
      "clue": "Use quotes for text.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint(9 // 2)",
      "expected": "4",
      "clue": "// gives the whole-number quotient."
    },
    {
      "type": "Build",
      "prompt": "Set attack to 8, bonus to 3, and total to their sum.",
      "verify": "attack == 8 and bonus == 3 and total == 11",
      "clue": "Use + to add two variables.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint(9 % 2)",
      "expected": "1",
      "clue": "% gives the remainder."
    },
    {
      "type": "Build",
      "prompt": "Create a Boolean variable named shield_on with the value True.",
      "verify": "shield_on is True",
      "clue": "Python Boolean names start with a capital letter.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nname = \"Py\"\nprint(name + \"thon\")",
      "expected": "Python",
      "clue": "+ joins two strings."
    },
    {
      "type": "Build",
      "prompt": "Set hp to 50, subtract 8 from it, then print hp.",
      "verify": "hp == 42",
      "clue": "Use -= or assign the result of subtraction.",
      "setup": "",
      "expectedStdout": "42"
    }
  ],
  [
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nhp = 0\nif hp == 0:\n    print(\"rest\")\nelse:\n    print(\"fight\")",
      "expected": "rest",
      "clue": "== tests equality."
    },
    {
      "type": "Build",
      "prompt": "Given coins, set can_buy to True if coins is at least 10, otherwise False.",
      "verify": "can_buy is True",
      "clue": "Use >= for at least.",
      "setup": "coins = 10"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint(5 != 3)",
      "expected": "True",
      "clue": "!= means not equal."
    },
    {
      "type": "Build",
      "prompt": "Given hp, print safe if hp is greater than 20, otherwise print heal.",
      "verify": "",
      "clue": "Use if and else with indented blocks.",
      "setup": "hp = 12",
      "expectedStdout": "heal"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint(True and False)",
      "expected": "False",
      "clue": "and requires both conditions to be True."
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint(False or True)",
      "expected": "True",
      "clue": "or needs at least one True condition."
    },
    {
      "type": "Build",
      "prompt": "Given score, set rank to gold for score >= 90, silver for score >= 60, or bronze otherwise.",
      "verify": "rank == \"silver\"",
      "clue": "Use if, elif, then else.",
      "setup": "score = 75"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint(not True)",
      "expected": "False",
      "clue": "not reverses a Boolean."
    },
    {
      "type": "Build",
      "prompt": "Given hp and potions, set needs_heal to True only when hp < 30 and potions > 0.",
      "verify": "needs_heal is True",
      "clue": "Combine the comparisons using and.",
      "setup": "hp = 20\npotions = 2"
    }
  ],
  [
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nitems = [2, 4, 6]\nprint(len(items))",
      "expected": "3",
      "clue": "len counts items."
    },
    {
      "type": "Build",
      "prompt": "Create inventory with sword and shield, then append potion.",
      "verify": "inventory == [\"sword\", \"shield\", \"potion\"]",
      "clue": "append adds one item to the end.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nitems = [\"a\", \"b\", \"c\"]\nprint(items[-1])",
      "expected": "c",
      "clue": "-1 selects the last item."
    },
    {
      "type": "Build",
      "prompt": "Given hp_values, replace the item at index 1 with 100.",
      "verify": "hp_values == [20, 100, 40]",
      "clue": "Assign to list[index].",
      "setup": "hp_values = [20, 30, 40]"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint([1, 2, 3, 4][1:3])",
      "expected": "[2, 3]",
      "clue": "Slices include the start and exclude the stop."
    },
    {
      "type": "Build",
      "prompt": "Given inventory, remove the string broken.",
      "verify": "inventory == [\"sword\", \"potion\"]",
      "clue": "remove searches for a value.",
      "setup": "inventory = [\"sword\", \"broken\", \"potion\"]"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint(\"bow\" in [\"sword\", \"bow\"])",
      "expected": "True",
      "clue": "in tests membership."
    },
    {
      "type": "Build",
      "prompt": "Given numbers, store their sum in total.",
      "verify": "total == 12",
      "clue": "sum adds the values in a list.",
      "setup": "numbers = [3, 4, 5]"
    },
    {
      "type": "Build",
      "prompt": "Given inventory, store its last item in last_item without removing it.",
      "verify": "last_item == \"potion\" and inventory == [\"sword\", \"potion\"]",
      "clue": "Use the index -1.",
      "setup": "inventory = [\"sword\", \"potion\"]"
    }
  ],
  [
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nfor n in range(2, 5):\n    print(n)",
      "expected": "2\n3\n4",
      "clue": "range excludes its stop value."
    },
    {
      "type": "Build",
      "prompt": "Given damage, loop through it and store the sum in total.",
      "verify": "total == 18",
      "clue": "Start total at zero and add each hit.",
      "setup": "damage = [4, 6, 8]"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ncount = 0\nwhile count < 3:\n    count += 1\nprint(count)",
      "expected": "3",
      "clue": "The loop ends when count reaches 3."
    },
    {
      "type": "Build",
      "prompt": "Use a while loop to print 3, 2, 1 on separate lines.",
      "verify": "",
      "clue": "Decrease the counter each time.",
      "setup": "",
      "expectedStdout": "3\n2\n1"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nfor n in range(5):\n    if n == 2:\n        break\n    print(n)",
      "expected": "0\n1",
      "clue": "break exits the loop."
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nfor n in range(3):\n    if n == 1:\n        continue\n    print(n)",
      "expected": "0\n2",
      "clue": "continue skips the remaining work for that iteration."
    },
    {
      "type": "Build",
      "prompt": "Given enemies, create a list named strong containing only values greater than 10.",
      "verify": "strong == [12, 20]",
      "clue": "Combine a for loop, if, and append.",
      "setup": "enemies = [4, 12, 8, 20]"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nfor n in range(0, 6, 2):\n    print(n)",
      "expected": "0\n2\n4",
      "clue": "The third range argument is the step."
    },
    {
      "type": "Build",
      "prompt": "Given names, print each name on its own line using a loop.",
      "verify": "",
      "clue": "Use for name in names.",
      "setup": "names = [\"Mira\", \"Kai\"]",
      "expectedStdout": "Mira\nKai"
    }
  ],
  [
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ndef greet():\n    return \"hello\"\nprint(greet())",
      "expected": "hello",
      "clue": "Call the function using parentheses."
    },
    {
      "type": "Build",
      "prompt": "Define heal(hp, amount) to return their sum.",
      "verify": "heal(10, 5) == 15 and heal(0, 8) == 8",
      "clue": "Use return to send back the result.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ndef boost(n):\n    return n + 2\nprint(boost(boost(3)))",
      "expected": "7",
      "clue": "Evaluate the inner call first."
    },
    {
      "type": "Build",
      "prompt": "Define is_alive(hp) to return whether hp is greater than zero.",
      "verify": "is_alive(3) is True and is_alive(0) is False and is_alive(-1) is False",
      "clue": "Return a comparison.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ndef hit(power=5):\n    return power * 2\nprint(hit())",
      "expected": "10",
      "clue": "A default is used when no argument is supplied."
    },
    {
      "type": "Build",
      "prompt": "Define greet(name=\"hero\") to return \"Hi \" followed by name.",
      "verify": "greet() == \"Hi hero\" and greet(\"Mira\") == \"Hi Mira\"",
      "clue": "Put the default value in the function definition.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ndef change(n):\n    n = 9\nx = 3\nchange(x)\nprint(x)",
      "expected": "3",
      "clue": "Reassigning a local parameter does not reassign x."
    },
    {
      "type": "Build",
      "prompt": "Define largest(a, b) to return the larger value.",
      "verify": "largest(2, 5) == 5 and largest(8, 3) == 8 and largest(4, 4) == 4",
      "clue": "Use a comparison and return.",
      "setup": ""
    },
    {
      "type": "Build",
      "prompt": "Define total_damage(hits) to return the sum of the list.",
      "verify": "total_damage([2, 3]) == 5 and total_damage([]) == 0",
      "clue": "You can use sum or accumulate with a loop.",
      "setup": ""
    }
  ],
  [
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nhero = {\"hp\": 40}\nhero[\"hp\"] += 10\nprint(hero[\"hp\"])",
      "expected": "50",
      "clue": "Update a dictionary value using its key."
    },
    {
      "type": "Build",
      "prompt": "Create hero with name Mira and hp 100.",
      "verify": "hero == {\"name\": \"Mira\", \"hp\": 100}",
      "clue": "Use a colon between each key and value.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint({\"hp\": 20}.get(\"mana\", 0))",
      "expected": "0",
      "clue": "get can return a default for a missing key."
    },
    {
      "type": "Build",
      "prompt": "Given hero, add the key armor with the value 5.",
      "verify": "hero == {\"hp\": 100, \"armor\": 5}",
      "clue": "Assign a value to a new key.",
      "setup": "hero = {\"hp\": 100}"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint(\"hp\" in {\"hp\": 20})",
      "expected": "True",
      "clue": "in tests dictionary keys."
    },
    {
      "type": "Build",
      "prompt": "Given hero, store the value of missing key mana in mana, defaulting to zero.",
      "verify": "mana == 0",
      "clue": "Use dict.get(key, default).",
      "setup": "hero = {\"hp\": 20}"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nprint(len({\"name\": \"Mira\", \"hp\": 100}))",
      "expected": "2",
      "clue": "len counts keys."
    },
    {
      "type": "Build",
      "prompt": "Given hero, delete the key curse.",
      "verify": "hero == {\"hp\": 50}",
      "clue": "Use del with the key.",
      "setup": "hero = {\"hp\": 50, \"curse\": True}"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nloot = {\"coins\": 5, \"gems\": 2}\nprint(sum(loot.values()))",
      "expected": "7",
      "clue": "values gives the stored values."
    },
    {
      "type": "Build",
      "prompt": "Given loot, loop over its values and store their sum in total.",
      "verify": "total == 9",
      "clue": "Use .values() to iterate over values.",
      "setup": "loot = {\"coins\": 6, \"gems\": 3}"
    }
  ],
  [
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ntry:\n    int(\"oops\")\nexcept ValueError:\n    print(\"retry\")",
      "expected": "retry",
      "clue": "Invalid integer text raises ValueError."
    },
    {
      "type": "Build",
      "prompt": "Given divisor, divide 10 by it into result. Catch ZeroDivisionError and set result to 0.",
      "verify": "result == 0",
      "clue": "Catch the exception around the division.",
      "setup": "divisor = 0"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ntry:\n    print(8 // 2)\nexcept ZeroDivisionError:\n    print(\"error\")\nelse:\n    print(\"done\")",
      "expected": "4\ndone",
      "clue": "else runs when the try block succeeds."
    },
    {
      "type": "Build",
      "prompt": "Given values, try to read index 5 into item. Catch IndexError and set item to None.",
      "verify": "item is None",
      "clue": "Out-of-range list access raises IndexError.",
      "setup": "values = [1, 2]"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ntry:\n    int(\"bad\")\nexcept ValueError:\n    print(\"error\")\nfinally:\n    print(\"cleanup\")",
      "expected": "error\ncleanup",
      "clue": "finally runs whether the operation succeeds or fails."
    },
    {
      "type": "Build",
      "prompt": "Define parse_number(text) to return int(text), or 0 if conversion raises ValueError.",
      "verify": "parse_number(\"12\") == 12 and parse_number(\"oops\") == 0",
      "clue": "Place try and except inside the function.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ntry:\n    print({}[\"hp\"])\nexcept KeyError:\n    print(\"missing\")",
      "expected": "missing",
      "clue": "An absent dictionary key raises KeyError."
    },
    {
      "type": "Build",
      "prompt": "Given hero, try to read hero[\"mana\"] into mana; catch KeyError and set mana to 0.",
      "verify": "mana == 0",
      "clue": "Catch KeyError around the key lookup.",
      "setup": "hero = {\"hp\": 50}"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ntry:\n    print(\"2\" + 2)\nexcept TypeError:\n    print(\"types differ\")",
      "expected": "types differ",
      "clue": "A string and an integer cannot be added directly."
    },
    {
      "type": "Build",
      "prompt": "Define require_positive(n) to return n when it is positive, otherwise raise ValueError.",
      "verify": "require_positive(3) == 3 and _raises_value_error(lambda: require_positive(0)) and _raises_value_error(lambda: require_positive(-2))",
      "clue": "Use raise ValueError for n <= 0.",
      "setup": "def _raises_value_error(fn):\n    try:\n        fn()\n    except ValueError:\n        return True\n    return False"
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ntry:\n    int(\"7\")\nexcept ValueError:\n    print(\"bad\")\nfinally:\n    print(\"finished\")",
      "expected": "finished",
      "clue": "Successful conversion skips except but still runs finally."
    }
  ],
  [
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nclass Hero:\n    def __init__(self):\n        self.hp = 100\nprint(Hero().hp)",
      "expected": "100",
      "clue": "__init__ runs when the instance is created."
    },
    {
      "type": "Build",
      "prompt": "Define Hero with __init__(self, name), storing name on self.name.",
      "verify": "Hero(\"Mira\").name == \"Mira\" and Hero(\"Kai\").name == \"Kai\"",
      "clue": "Each instance stores its own name.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nclass Hero:\n    def __init__(self, hp):\n        self.hp = hp\na = Hero(10)\nb = Hero(20)\nprint(a.hp + b.hp)",
      "expected": "30",
      "clue": "Different objects have separate instance attributes."
    },
    {
      "type": "Build",
      "prompt": "Define Shield with __init__(self, armor) and protect(self, damage), returning max(0, damage - self.armor).",
      "verify": "Shield(3).protect(8) == 5 and Shield(10).protect(2) == 0",
      "clue": "Methods read instance attributes through self.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nclass Hero:\n    def __init__(self):\n        self.hp = 30\nh = Hero()\nh.hp -= 5\nprint(h.hp)",
      "expected": "25",
      "clue": "Attributes can be updated after construction."
    },
    {
      "type": "Build",
      "prompt": "Define Counter starting with value 0 and an increment method that adds 1 to self.value.",
      "verify": "(lambda c: (c.increment(), c.increment(), c.value)[-1] == 2)(Counter())",
      "clue": "Initialize the attribute in __init__.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nclass Hero:\n    def shout(self):\n        return \"Go!\"\nprint(Hero().shout())",
      "expected": "Go!",
      "clue": "Calling a bound method supplies self automatically."
    },
    {
      "type": "Build",
      "prompt": "Define Potion with amount and a heal(self, hp) method returning hp + self.amount.",
      "verify": "Potion(10).heal(20) == 30 and Potion(3).heal(0) == 3",
      "clue": "Pass self first in both methods.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nclass Hero:\n    species = \"human\"\nprint(Hero.species)",
      "expected": "human",
      "clue": "A class attribute can be read on the class."
    },
    {
      "type": "Build",
      "prompt": "Define Enemy storing hp, with is_alive(self) returning whether self.hp > 0.",
      "verify": "Enemy(10).is_alive() is True and Enemy(0).is_alive() is False",
      "clue": "Return a comparison from the method.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nclass Hero:\n    def __init__(self, hp=100):\n        self.hp = hp\nprint(Hero().hp)",
      "expected": "100",
      "clue": "Constructors can use default parameter values."
    }
  ],
  [
    {
      "type": "Build",
      "prompt": "Define damage_after_armor(damage, armor) to return damage minus armor, never below 0.",
      "verify": "damage_after_armor(12, 3) == 9 and damage_after_armor(2, 8) == 0",
      "clue": "Combine subtraction with max.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\nhits = [3, 5, 2]\nhp = 20\nfor hit in hits:\n    hp -= hit\nprint(hp)",
      "expected": "10",
      "clue": "Subtract each hit from the remaining HP."
    },
    {
      "type": "Build",
      "prompt": "Define surviving(hps) to return a list containing only HP values greater than 0, in the original order.",
      "verify": "surviving([10, 0, -2, 5]) == [10, 5] and surviving([]) == []",
      "clue": "Use a loop or a list comprehension.",
      "setup": ""
    },
    {
      "type": "Build",
      "prompt": "Define loot_total(loot) to return the sum of the values in a dictionary.",
      "verify": "loot_total({\"coins\": 5, \"gems\": 3}) == 8 and loot_total({}) == 0",
      "clue": "Combine a function with dictionary values.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ndef heal(hp, amount):\n    return min(100, hp + amount)\nprint(heal(95, 20))",
      "expected": "100",
      "clue": "min caps HP at 100."
    },
    {
      "type": "Build",
      "prompt": "Define heal(hp, amount) to add amount but cap the result at 100.",
      "verify": "heal(20, 10) == 30 and heal(95, 20) == 100",
      "clue": "Use min to cap the sum.",
      "setup": ""
    },
    {
      "type": "Build",
      "prompt": "Define parse_damage(text) to return a nonnegative integer; return 0 for invalid integer text.",
      "verify": "parse_damage(\"12\") == 12 and parse_damage(\"-4\") == 0 and parse_damage(\"oops\") == 0",
      "clue": "Combine try/except, int, and max.",
      "setup": ""
    },
    {
      "type": "Predict",
      "prompt": "What will this print?\n\ninventory = {\"potions\": 2}\nif inventory[\"potions\"] > 0:\n    inventory[\"potions\"] -= 1\nprint(inventory[\"potions\"])",
      "expected": "1",
      "clue": "Spend one potion only when one is available."
    },
    {
      "type": "Build",
      "prompt": "Define apply_hits(hp, hits) to subtract every hit and return remaining HP, never below zero.",
      "verify": "apply_hits(20, [3, 5]) == 12 and apply_hits(5, [10]) == 0 and apply_hits(7, []) == 7",
      "clue": "Use a loop, then clamp the final value.",
      "setup": ""
    },
    {
      "type": "Build",
      "prompt": "Define Hero with hp and take_hit(self, damage), updating self.hp without allowing it below 0.",
      "verify": "(lambda h: (h.take_hit(8), h.hp == 12, h.take_hit(99), h.hp == 0)[1::2] == (True, True))(Hero(20))",
      "clue": "Combine a class, a method, subtraction, and max.",
      "setup": ""
    }
  ]
];
