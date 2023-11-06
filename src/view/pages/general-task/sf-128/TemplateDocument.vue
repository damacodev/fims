<template>
  <div class="template">
    <b-table-simple>
      <b-thead>
        <b-tr>
          <b-td class="align-middle text-left pl-0" width="80%">
            <h4 class="font-weight-bolder">TANK RELEASE</h4>
            <span>Number : {{ form.number }}</span>
          </b-td>
          <b-td class="align-middle">
            <img
              src="https://www.pertamina.com/Media/Image/Pertamina.png"
              height="40px"
            />
          </b-td>
        </b-tr>
      </b-thead>
    </b-table-simple>
    <b-table-simple borderless>
      <b-tbody>
        <b-tr>
          <b-td class="p-0">LOCATION</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0" colspan="4">{{ form.dppu.label }}</b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">TANK NO.</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0" colspan="4">{{ form.tank.label }}</b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">GRADE</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0" colspan="4">{{ form.grade.grade }}</b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">BATCH NO.</b-td>
          <b-td class="p-0 text-center" width="20px">:</b-td>
          <b-td class="p-0" width="200px">{{ form.grade.batchNo }}</b-td>
          <b-td class="p-0">Date</b-td>
          <b-td class="p-0 text-center" width="20px">:</b-td>
          <b-td class="p-0">
            {{ dateFormat(form.grade.date, "DD.MM.YYYY") }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">SOURCE</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0" colspan="4">{{ form.source.source }}</b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">BATCH NO.</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0" width="200px">{{ form.source.batchNo }}</b-td>
          <b-td class="p-0">Date</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0">
            {{ dateFormat(form.source.date, "DD.MM.YYYY") }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">RE-CERTIFICATION</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0" width="200px">{{ form.reCertification.no }}</b-td>
          <b-td class="p-0">Date</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0">
            {{ dateFormat(form.reCertification.date, "DD.MM.YYYY") }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">Ex Certificate of Quality No.</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0" width="200px">{{ form.exCertificate.no }}</b-td>
          <b-td class="p-0">Date</b-td>
          <b-td class="p-0 text-center">:</b-td>
          <b-td class="p-0">
            {{ dateFormat(form.exCertificate.date, "DD.MM.YYYY") }}
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <p class="mt-4">
      Check and complete the following before release of aviation fuel tanks
      (following acceptance test) :
    </p>
    <b-table-simple borderless>
      <b-thead>
        <b-tr>
          <b-td colspan="2"></b-td>
          <b-td class="p-0 text-center">YES</b-td>
          <b-td class="p-0 text-center">NO</b-td>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td class="p-0">1.</b-td>
          <b-td class="p-0">Satisfactory COQ received from supply point</b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.satisfactoryCoq == true ? `⎷` : `` }}
            </span>
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.satisfactoryCoq == false ? `⎷` : `` }}
            </span>
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">2.</b-td>
          <b-td class="p-0">
            Tank Batch Release sign by Aviation Manager or Acting Manager Region
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.tankBatchRelease == true ? `⎷` : `` }}
            </span>
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.tankBatchRelease == false ? `⎷` : `` }}
            </span>
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">3.</b-td>
          <b-td class="p-0">
            Settling time requirement has been met (minimum 2 hours)
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.settlingTimeRequirement == true ? `⎷` : `` }}
            </span>
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.settlingTimeRequirement == false ? `⎷` : `` }}
            </span>
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">4.</b-td>
          <b-td class="p-0">
            Tank has remained isolated since receipt of product
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.tankHasRemained == true ? `⎷` : `` }}
            </span>
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.tankHasRemained == false ? `⎷` : `` }}
            </span>
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">5.</b-td>
          <b-td class="p-0">
            Tank sump samples, visually free from suspended dirt and water
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.tankSumpSamples == true ? `⎷` : `` }}
            </span>
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.tankSumpSamples == false ? `⎷` : `` }}
            </span>
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">6.</b-td>
          <b-td class="p-0">
            Tank drained, sample checked and result recorded as below
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.tankDrained == true ? `⎷` : `` }}
            </span>
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.tankDrained == false ? `⎷` : `` }}
            </span>
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">7.</b-td>
          <b-td class="p-0">
            Electrical Conductivity measured on site and recorded as below
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.electricalConductivity == true ? `⎷` : `` }}
            </span>
          </b-td>
          <b-td class="p-0 text-center" style="border: 1px solid #3f4254">
            <span class="font-weight-bolder">
              {{ form.question.electricalConductivity == false ? `⎷` : `` }}
            </span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-table-simple bordered>
      <b-tbody>
        <b-tr>
          <b-td class="font-weight-bolder" colspan="7">SAMPLING RECORD</b-td>
        </b-tr>
        <b-tr>
          <b-td class="align-middle text-center">Dirty (Visual)</b-td>
          <b-td class="align-middle text-center">Free Water</b-td>
          <b-td class="align-middle text-center">Suspended Water</b-td>
          <b-td class="align-middle text-center">Colour</b-td>
          <b-td class="align-middle text-center">Density Obs. (Kg/Ltrs)</b-td>
          <b-td class="align-middle text-center">Temp. Obs. (°C)</b-td>
          <b-td class="align-middle text-center">
            Electrical Conductivity (pS/m)
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="text-center">{{ form.samplingRecord.dirty }}</b-td>
          <b-td class="text-center">{{ form.samplingRecord.freeWater }}</b-td>
          <b-td class="text-center">
            {{ form.samplingRecord.suspendedWater }}
          </b-td>
          <b-td class="text-center">{{ form.samplingRecord.colour }}</b-td>
          <b-td class="text-center">
            {{ numberFormat(form.samplingRecord.densityObserved, 4) }}
          </b-td>
          <b-td class="text-center">
            {{ numberFormat(form.samplingRecord.temperatureObserved) }}
          </b-td>
          <b-td class="text-center">
            {{ numberFormat(form.samplingRecord.electricalConductivity) }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-td colspan="7"></b-td>
        </b-tr>
        <b-tr>
          <b-td class="align-middle text-center" colspan="3">
            Tank Density @ 15°C
          </b-td>
          <b-td class="align-middle text-center" colspan="3">
            Batch Density
          </b-td>
          <b-td class="align-middle text-center">Variance</b-td>
        </b-tr>
        <b-tr>
          <b-td class="text-center" colspan="3">
            {{ numberFormat(form.samplingRecord.tankDensityAt15Degree, 4) }}
          </b-td>
          <b-td class="text-center" colspan="3">
            {{ numberFormat(form.samplingRecord.batchDensity, 4) }}
          </b-td>
          <b-td class="text-center">
            {{ numberFormat(form.samplingRecord.variance, 4) }}
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <p class="mt-10">
      The above tank has been flushed and tank sump sample has been checked.<br />
      Certified that the product detailde here on conform to the relevant
      specification and have been handle according to Pertamina procedures.
    </p>
    <b-table-simple borderless>
      <b-tbody>
        <b-tr>
          <b-td class="p-0">Date of Tank Release on</b-td>
          <b-td class="p-0" width="20px">:</b-td>
          <b-td class="p-0" width="200px">
            {{ dateFormat(form.tankReleaseDate, "DD MMMM YYYY") }}
          </b-td>
          <b-td class="p-0">Time</b-td>
          <b-td class="p-0" width="20px">:</b-td>
          <b-td class="p-0">
            {{ dateFormat(form.tankReleaseDate, "HH:mm") }}
          </b-td>
        </b-tr>
        <b-tr>
          <b-td class="p-0">Date of Beginning Settling</b-td>
          <b-td class="p-0" width="20px">:</b-td>
          <b-td class="p-0" width="200px">
            {{ dateFormat(form.beginningSettlingDate, "DD MMMM YYYY") }}
          </b-td>
          <b-td class="p-0">Time</b-td>
          <b-td class="p-0" width="20px">:</b-td>
          <b-td class="p-0">
            {{ dateFormat(form.beginningSettlingDate, "HH:mm") }}
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <table class="table table-borderless mt-4">
      <tbody>
        <tr>
          <td class="text-left">
            Quality Controller by :
            <br />
            {{
              approveProgress.qualityControllerBy == null
                ? "-"
                : approveProgress.qualityControllerBy.position
            }}
          </td>
          <td class="text-left">
            Released by :
            <br />
            {{
              approveProgress.releasedBy == null
                ? "-"
                : approveProgress.releasedBy.position
            }}
          </td>
        </tr>
        <tr>
          <td height="80">
            <vue-qr
              v-if="approveProgress.qualityControllerBy != null"
              :text="approveProgress.qualityControllerBy.id"
              :size="80"
              :margin="0"
            />
          </td>
          <td height="80">
            <vue-qr
              v-if="approveProgress.releasedBy != null"
              :text="approveProgress.releasedBy.id"
              :size="80"
              :margin="0"
            />
          </td>
        </tr>
        <tr>
          <td>
            <p class="font-weight-bolder">
              {{
                approveProgress.qualityControllerBy == null
                  ? "-"
                  : approveProgress.qualityControllerBy.name
              }}
            </p>
          </td>
          <td>
            <p class="font-weight-bolder">
              {{
                approveProgress.releasedBy == null
                  ? "-"
                  : approveProgress.releasedBy.name
              }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import { numberFormat, dateFormat } from "@/core/utils";

export default {
  components: {
    VueQr
  },
  props: {
    form: Object,
    approveProgress: Object
  },
  methods: {
    numberFormat,
    dateFormat
  }
};
</script>
