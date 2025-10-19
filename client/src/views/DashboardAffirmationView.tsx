import { MenuCard } from '../components/MenuCard'
import { useState, useEffect } from 'react'
import { useTheme } from 'styled-components'

interface DashboardAffirmationViewProps {
  affirmation: string | null
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  loading: boolean
  error: string | null
  categories: string[]
}

function DashboardAffirmationView({
  affirmation,
  selectedCategory,
  setSelectedCategory,
  loading,
  error,
  categories,
}: DashboardAffirmationViewProps) {
  const [searchText, setSearchText] = useState<string>('') // State for search input
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false) // State for dropdown visibility

  const theme = useTheme() // Access the theme for consistent styling

  // Update searchText when selectedCategory changes
  useEffect(() => {
    if (selectedCategory !== 'random') {
      setSearchText(selectedCategory) // Update searchText only if a category is selected
    }
  }, [selectedCategory])

  // Filter categories based on search text
  const filteredCategories = isDropdownVisible
    ? categories // Show all categories when dropdown is open
    : (categories || []).filter((category) =>
        category.toLowerCase().includes(searchText.toLowerCase())
      )

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev)
  }

  return (
    <MenuCard
      title="Affirmation"
      isUsingCloseButton
      linkCloseButton="/dashboard"
    >
      {/* Searchable Dropdown */}
      <div
        style={{
          position: 'relative',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: `2px solid ${theme.colors.black}`,
            borderRadius: '10px',
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: theme.colors.white, // Match background color to TodoList
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          }}
          onClick={toggleDropdown} // Toggle dropdown on click
        >
          <input
            type="text"
            placeholder="Search categories..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
            }}
          />
          <span
            style={{
              marginLeft: '8px',
              transform: isDropdownVisible ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          >
            ▼
          </span>
        </div>

        {/* Category List */}
        {isDropdownVisible && (
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
              margin: '8px 0 0',
              maxHeight: '150px',
              overflowY: 'auto',
              border: `2px solid ${theme.colors.black}`,
              borderRadius: '10px',
              backgroundColor: '#fff',
              position: 'absolute',
              width: '100%',
              zIndex: 1000,
            }}
          >
            {filteredCategories.map((category) => (
              <li
                key={category}
                onClick={() => {
                  setSelectedCategory(category) // Update selected category
                  setSearchText(category) // Update search text to reflect the selected category
                  setIsDropdownVisible(false) // Hide dropdown after selection
                }}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor:
                    category === selectedCategory ? '#f0f0f0' : 'transparent',
                  fontWeight: category === selectedCategory ? 'bold' : 'normal',
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Affirmation Content */}
      <div
        style={{
          textAlign: 'center',
          fontSize: '1.5rem', // Increase font size
          fontWeight: 'bold',
          marginTop: '3px', // Add space above the affirmation
        }}
      >
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && <p>{affirmation}</p>}
      </div>
    </MenuCard>
  )
}

export default DashboardAffirmationView
