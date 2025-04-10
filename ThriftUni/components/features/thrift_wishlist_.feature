Feature: Wishlist Browsing
  As a thrift store shopper
  I want to browse, filter, and sort my wishlist items by availability, cost, or name
  So that I can quickly find and manage the items I’m interested in

  Background:
    Given the following items exist in my wishlist:
      | id | title               | price | available | imagePath                         |
      | 1  | Tiffany Lamp        | 50.45 | true      | ../../assets/images/lamp.png      |
      | 2  | Miffy Pottery Bowl  | 15.78 | true      | ../../assets/images/bowl.png      |
      | 3  | Cat Jewelry Box     | 15.78 | true      | ../../assets/images/jewelry.png   |
      | 4  | Doe Blanket         | 25.99 | false     | ../../assets/images/blanket.png   |
    And I open the "My Wishlist" page

  Scenario: Filter items by availability
    When I select "Available" from the availability filter
    Then I should only see items that are marked as available
    And I should see a total of 3 items in the list

  Scenario: Filter items by unavailability
    When I select "Unavailable" from the availability filter
    Then I should only see items that are marked as unavailable
    And I should see a total of 1 item in the list
    And the item title should be "Doe Blanket"

  Scenario: Sort items by price in ascending order
    When I sort the wishlist by "price" ascending
    Then the first item in the list should be "Miffy Pottery Bowl"
    And the last item in the list should be "Tiffany Lamp"

  Scenario: Sort items by price in descending order
    When I sort the wishlist by "price" descending
    Then the first item in the list should be "Tiffany Lamp"
    And the last item in the list should be "Miffy Pottery Bowl"

  Scenario: Sort items by name A-Z
    When I sort the wishlist by "name" ascending
    Then the first item in the list should be "Cat Jewelry Box"
    And the last item in the list should be "Tiffany Lamp"

  Scenario: Sort items by name Z-A
    When I sort the wishlist by "name" descending
    Then the first item in the list should be "Tiffany Lamp"
    And the last item in the list should be "Cat Jewelry Box"

  Scenario: Remove an unavailable item
    Given I see an item with the title "Doe Blanket" in my wishlist
    When I tap "Remove" on the item with the title "Doe Blanket"
    Then the item "Doe Blanket" should no longer appear in my wishlist
    And I should see a confirmation or updated list without that item

  Scenario: Verify empty wishlist message
    Given I have removed all items from my wishlist
    When I visit the "My Wishlist" page
    Then I should see a message that says "Your wishlist is empty"
