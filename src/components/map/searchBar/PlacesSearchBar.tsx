import { zoomLevel } from '@/src/utils/constants'
import { useCombobox } from 'downshift'
import { useMemo, useState } from 'react'

function PlacesSearchBar({ changeCenter }: ChangeCenterProps) {
  const google = window.google
  const service = new google.maps.places.AutocompleteService()

  const sessionToken = useMemo(
    () => new google.maps.places.AutocompleteSessionToken(),
    [google.maps.places.AutocompleteSessionToken]
  )

  const [searchResult, setSearchResult] = useState({
    autocompleteSuggestions: [],
    status: '',
  })

  const { highlightedIndex, getInputProps, getItemProps, getMenuProps } =
    useCombobox({
      items: searchResult.autocompleteSuggestions,
      itemToString: (item: any) => (item ? item.name.string : ''),
      onInputValueChange: ({ inputValue }) => {
        if (inputValue === '') {
          setSearchResult({
            autocompleteSuggestions: [],
            status: '',
          })
          return
        }
        service.getPlacePredictions(
          {
            input: inputValue!,
            sessionToken: sessionToken,
          },
          handlePredictions
        )

        function handlePredictions(predictions: any, status: string) {
          if (status === 'OK') {
            const autocompleteSuggestions = predictions.map(
              (prediction: any) => {
                return {
                  id: prediction.place_id,
                  name: {
                    string: prediction.structured_formatting.main_text,
                  },
                  address: {
                    string:
                      prediction.structured_formatting.secondary_text,
                  },
                }
              }
            )
            setSearchResult({
              autocompleteSuggestions: autocompleteSuggestions,
              status: status,
            })
          } else {
            setSearchResult({
              autocompleteSuggestions: [],
              status: status,
            })
          }
        }
      },
      onSelectedItemChange({ selectedItem }) {
        const placeId = selectedItem?.id
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

        const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`

        setSearchResult({
          autocompleteSuggestions: [],
          status: '',
        })
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.status === 'OK') {
              const location = data.results[0].geometry.location
              const lat = location.lat
              const lng = location.lng
              changeCenter({ lat, lng }, zoomLevel.CLOSE)
              setSearchResult({
                autocompleteSuggestions: [],
                status: '',
              })
            } else {
              console.log('Geocoding API request failed.')
            }
          })
          .catch(error => {
            console.log('Error:', error)
          })
      },
    })

  return (
    <div className='absolute top-4 w-full flex flex-col'>
      <input
        type='search'
        {...getInputProps()}
        className='h-10 w-3/4 px-3 py-2 mx-auto bg-primary text-base text-secondary globalRounded focus:outline-none'
      />
      <ul {...getMenuProps()} className='mt-2 flex flex-col space-y-1'>
        {searchResult.autocompleteSuggestions.length > 0
          ? searchResult.autocompleteSuggestions.map(
              (item: any, index) => {
                return (
                  <li
                    key={item.id}
                    {...getItemProps({
                      item,
                      index,
                    })}
                    className={`${
                      highlightedIndex === index
                        ? 'bg-gray-500'
                        : 'bg-primary'
                    } p-2 z-30 w-3/4 mx-auto text-secondary border-2 border-tertiary globalRounded`}
                  >
                    <p className='text-sm font-medium'>
                      {item.name.string}
                    </p>
                    <p className='text-xs font-light'>
                      {item.address.string}
                    </p>
                  </li>
                )
              }
            )
          : null}
      </ul>
    </div>
  )
}

export default PlacesSearchBar
