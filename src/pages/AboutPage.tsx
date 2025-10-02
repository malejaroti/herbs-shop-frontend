import PageShell from "../components/layout/PageShell"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import heroImage from '../assets/Picture-July-in-garten-sunset.jpg'


function AboutPage() {
  return (
    <PageShell>
      <Stack direction="row" spacing={3}>
        <Box
          component="img"
          src={heroImage}
          alt="Bild von July im ihren Garten"
          sx={{
                height: "250px",
                borderRadius: 2, // rounded corners
                boxShadow: "0 8px 16px rgba(0,0,0,0.25)", // shadow for depth
                // transform: "perspective(1000px) rotateX(2deg) rotateY(-2deg)", // subtle tilt
          }}
        >
        </Box>
        <Stack>
          <Typography variant="h4" sx={{mb:'10px'}}>
            Hallo! Ich bin Julia
          </Typography>

          <Typography variant={"body2"} sx={{mb:'10px'}} >
            Ich bin eine leidenschaftliche Gärtnerin und Hobbygärtnerin aus dem
            Süden Deutschlands – genauer gesagt aus Mittelfranken in Bayern, wo ich
            meinen wunderschönen Garten bewirtschafte. Seit über 20 Jahren gehe ich
            meiner Leidenschaft für das Gärtnern nach – vieles habe ich von meinen
            Eltern gelernt.
          </Typography>
          <Typography variant={"body2"} sx={{mb:'10px'}}>
            Alle meine Pflanzen und Produkte kultiviere ich mit viel Liebe und
            Sorgfalt. Dabei lege ich großen Wert auf ökologische Praktiken: Ich
            verzichte bewusst auf giftige Dünger und nutze meinen eigenen Kompost.
            Für mich bedeutet Gartenarbeit Achtsamkeit, Verbundenheit mit der Natur
            und Verantwortung.
          </Typography>
          <Typography variant={"body2"} sx={{mb:'10px'}}>
            Ich hoffe, dass Sie all diese Liebe und Hingabe in meinen Produkten
            spüren – von der Pflege im Garten über die Ernte bis hin zum Versand an
            Sie. Vielen Dank, dass Sie meine Seite besuchen.
          </Typography>

        </Stack>
      </Stack>
    </PageShell>
  )
}
export default AboutPage