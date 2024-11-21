import { Checkbox } from "@/components/ui/checkbox"

export default function ListCheckboxPrice() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Price</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="less-than-5" />
          <label
            htmlFor="less-than-5"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Less than 5$
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="5-to-10" />
          <label
            htmlFor="5-to-10"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            5 to 10$
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="15-to-20" />
          <label
            htmlFor="15-to-20"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            15 to 20$
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="20-to-25" />
          <label
            htmlFor="20-to-25"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            20 to 25$
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="more-than-25" />
          <label
            htmlFor="more-than-25"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            More than $25
          </label>
        </div>
      </div>
    </div>
  )
}

