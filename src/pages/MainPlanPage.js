import React, { useState } from "react"
import "../styles/MainPlanPage.css" // zaimportuj odpowiedni plik CSS
import PageHeader from "../components/PageHeader"
import "../styles/FormStyle.css"
import { useQuery, gql } from "@apollo/client"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const GET_USERS = gql`
  query allPersons {
    allPersons {
      id
      firstName
      lastName
    }
  }
`

const FIND_COMMON_FREE_TIME_SLOTS = gql`
  query findCommonFreeTimeSlots(
    $date: String!
    $hourFrom: String!
    $hourTo: String!
    $personIds: [ID!]!
  ) {
    findCommonFreeTimeSlots(
      date: $date
      hourFrom: $hourFrom
      hourTo: $hourTo
      personIds: $personIds
    ) {
      startTime
      endTime
    }
  }
`

const MainPlanPage = () => {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(GET_USERS)

  const [selectedUserIdFirst, setSelectedUserIdFirst] = useState("")
  const [selectedUserIdSecond, setSelectedUserIdSecond] = useState("")
  const [selectedUserIdThird, setSelectedUserIdThird] = useState("")
  const [selectedUserIdFourth, setSelectedUserIdFourth] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [timeFrom, setTimeFrom] = useState("8:00")
  const [timeTo, setTimeTo] = useState("16:00")

  const personIds = [
    selectedUserIdFirst,
    selectedUserIdSecond,
    selectedUserIdThird,
    selectedUserIdFourth,
  ].filter((id) => id !== "")

  const handleSelectChangeFirst = (event) => {
    setSelectedUserIdFirst(event.target.value)
  }

  const handleSelectChange = (event) => {
    setSelectedUserIdSecond(event.target.value)
  }

  const handleSelectChangeThird = (event) => {
    setSelectedUserIdThird(event.target.value)
  }

  const handleSelectChangeFourth = (event) => {
    setSelectedUserIdFourth(event.target.value)
  }

  const {
    loading: commonLoading,
    error: commonError,
    data: commonData,
  } = useQuery(FIND_COMMON_FREE_TIME_SLOTS, {
    variables: {
      date: startDate.toISOString().split("T")[0], // Converting to 'yyyy-mm-dd' format
      hourFrom: timeFrom,
      hourTo: timeTo,
      personIds: personIds,
    },
    skip: personIds.length < 2, // Only run the query if at least two users are selected
  })

  if (usersLoading) return <p>Ładowanie danych użytkowników...</p>
  if (usersError)
    return (
      <p>
        Wystąpił błąd podczas ładowania danych użytkowników:{" "}
        {usersError.message}
      </p>
    )

  return (
    <div>
      <PageHeader title="Porównanie planów" />
      <div className="plan-main-container">
        <div className="plan-comparison-container">
          <div className="top-row">
            <div className="search-form">
              <div className="main-form-container">
                <form>
                  <div className="form-row">
                    <div className="form-element">
                      <h2>Wybierz 1 osobę</h2>
                      <select
                        value={selectedUserIdFirst}
                        onChange={handleSelectChangeFirst}
                      >
                        <option
                          value=""
                          disabled
                        >
                          Wybierz pierwszą osobę
                        </option>
                        {usersData &&
                          usersData.allPersons.map((person) => (
                            <option
                              key={person.id}
                              value={person.id}
                            >
                              {person.firstName} {person.lastName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-element">
                      <h2>Wybierz 2 osobę</h2>
                      <select
                        value={selectedUserIdSecond}
                        onChange={handleSelectChange}
                      >
                        <option
                          value=""
                          disabled
                        >
                          Wybierz drugą osobę
                        </option>
                        {usersData &&
                          usersData.allPersons.map((person) => (
                            <option
                              key={person.id}
                              value={person.id}
                            >
                              {person.firstName} {person.lastName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-element">
                      <h2>Wybierz 3 osobę</h2>
                      <select
                        value={selectedUserIdThird}
                        onChange={handleSelectChangeThird}
                      >
                        <option
                          value=""
                          disabled
                        >
                          Wybierz trzecią osobę
                        </option>
                        {usersData &&
                          usersData.allPersons.map((person) => (
                            <option
                              key={person.id}
                              value={person.id}
                            >
                              {person.firstName} {person.lastName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-element">
                      <h2>Wybierz 4 osobę</h2>
                      <select
                        value={selectedUserIdFourth}
                        onChange={handleSelectChangeFourth}
                      >
                        <option
                          value=""
                          disabled
                        >
                          Wybierz czwartą osobę
                        </option>
                        {usersData &&
                          usersData.allPersons.map((person) => (
                            <option
                              key={person.id}
                              value={person.id}
                            >
                              {person.firstName} {person.lastName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-element">
                      <h2>Wybierz datę</h2>
                      <div className="input-with-label">
                        <span className="date-label">Data </span>
                        <DatePicker
                          selected={startDate}
                          onChange={setStartDate}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                      {/* <div className="input-with-label">
                        <span className="date-label">Do</span>
                        <DatePicker
                          selected={endDate}
                          onChange={setEndDate}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div> */}
                    </div>

                    <div className="form-element">
                      <h2>Wybierz godzinę</h2>
                      <div className="input-with-label">
                        <span>Od</span>
                        <input
                          type="text"
                          placeholder="8:00"
                          value={timeFrom}
                          onChange={(e) => setTimeFrom(e.target.value)}
                        />
                      </div>
                      <div className="input-with-label">
                        <span>Do</span>
                        <input
                          type="text"
                          placeholder="15:00"
                          value={timeTo}
                          onChange={(e) => setTimeTo(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="common-free-hours">
              <h2>Wspólne wolne godziny</h2>
              {commonLoading && <p>Ładowanie...</p>}
              {commonError && <p>Błąd: {commonError.message}</p>}
              {commonData && (
                <table>
                  <thead>
                    <tr>
                      <td>Od</td>
                      <td>Do</td>
                    </tr>
                  </thead>
                  <tbody>
                    {commonData.findCommonFreeTimeSlots.map((slot, index) => (
                      <tr key={index}>
                        <td>{slot.startTime}</td>
                        <td>{slot.endTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPlanPage
