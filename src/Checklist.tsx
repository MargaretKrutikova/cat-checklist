import * as React from "react"
import { useQuery } from "react-apollo-hooks"

import { CircularProgress, Typography } from "@material-ui/core"
import FormGroup from "@material-ui/core/FormGroup"
import Divider from "@material-ui/core/Divider"

import {
  STANDARD_CHECKLIST_ITEMS,
  ChecklistItemInfo,
  shouldGiveMedicine,
  MEDICINE_CHECKLIST_ITEMS
} from "./data"
import { ChecklistItem } from "./ChecklistItem"
import {
  ChecklistByDateResponse,
  ChecklistByDateQuery,
  ChecklistItem as ChecklistItemType
} from "./graphql"

type Props = {
  dueDate: string
}

export const Checklist: React.FC<Props> = props => {
  const checklistQuery = useQuery<ChecklistByDateResponse>(
    ChecklistByDateQuery,
    {
      variables: { dueDate: props.dueDate }
    }
  )

  if (checklistQuery.loading) return <CircularProgress />

  const checklistData =
    checklistQuery.data && checklistQuery.data.checklist
      ? checklistQuery.data.checklist
      : []

  const getChecklistItem = (item: ChecklistItemInfo): ChecklistItemType =>
    checklistData.find(i => i.code === item.code) || {
      checked: false,
      doneDate: null,
      code: item.code,
      userName: null
    }

  const combineMedicineItems = (
    baseItems: ChecklistItemInfo[],
    medicineItems: ChecklistItemInfo[]
  ) =>
    (shouldGiveMedicine(new Date(props.dueDate)) ? medicineItems : []).concat(
      baseItems
    )

  const renderList = (items: ChecklistItemInfo[]) => (
    <FormGroup row={false} style={{ marginBottom: 20 }}>
      {items.map(item => (
        <React.Fragment key={item.code}>
          <ChecklistItem
            code={item.code}
            name={item.name}
            note={item.note}
            dueDate={props.dueDate}
            requireEnterResult={item.requireEnterResult || false}
            {...getChecklistItem(item)}
          />
          <Divider />
        </React.Fragment>
      ))}
    </FormGroup>
  )

  return (
    <>
      <div>
        <Typography variant="h5">Morning</Typography>

        {renderList(
          combineMedicineItems(
            STANDARD_CHECKLIST_ITEMS.morning,
            MEDICINE_CHECKLIST_ITEMS.morning
          )
        )}
      </div>
      <div>
        <Typography variant="h5">Evening</Typography>

        {renderList(
          combineMedicineItems(
            STANDARD_CHECKLIST_ITEMS.evening,
            MEDICINE_CHECKLIST_ITEMS.evening
          )
        )}
      </div>
      {checklistQuery.error ? <p>Error fetching data!</p> : null}
    </>
  )
}
